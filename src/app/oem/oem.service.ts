import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../shared/core.service';
import { AppConfig } from '../app-config';
import { NotificationService } from '../notification/notification.service';
import { WebsocketService } from '../shared/websocket.service';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NewVerdictMsg {
  T1name: string;
  VNETDesignName: string;
  Verdict: string;
}

interface BodyType {
  topo: string;
  name: string;
  cname: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OemService {

  public deployedName: string;
  // public messages: NewDesignMsg[] = [];
  // public messages: Subject<NewDesignMsg> = new Subject();
  public isWorkingSubject: Subject<boolean> = new Subject();
  public oemMsg: ReplaySubject<NewVerdictMsg> = new ReplaySubject(1);
  public deployed: boolean;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private notificationService: NotificationService,
    private webSocketService: WebsocketService
  ) { }

  public deployDesign(designName: string, OEMName: string, address: string) {
    this.isWorkingSubject.next(true);

    this.deployedName = designName;

    const body: BodyType = {
      topo: JSON.stringify(AppConfig.POST_OEM_TOPO),
      name: designName,
      cname: OEMName
    };

    // if (address) {
    //   body.address = address;
    // }

    this.http.post(AppConfig.REST_BASE_URL + '/addVnetDesign', body).subscribe(
      res => {
        this.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Successfull', 'VNet Design Successfully Deployed to Blockchain', 'success');
        this.deployed = true;
      },
      error => {
        this.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Failed', 'VNet Design Deployment Has Failed', 'danger');
      }
    );
  }

  public connectWS(): Subject<NewVerdictMsg> {
    return <Subject<NewVerdictMsg>>this.webSocketService
    .connectT1(AppConfig.WS_URL + ':8383')
    .pipe(
      map((res: MessageEvent): NewVerdictMsg => {
        const data = JSON.parse(res.data);
        const msg = {
          T1name: data.T1name,
          VNETDesignName: data.VNETDesignName,
          Verdict: data.Verdict
        };

        // this.messages.next(msg);

        return msg;
      })
    );
  }

  public destroyWS() {
    this.webSocketService.closeOEM();
  }

  // public addMsg(msg: NewDesignMsg) {
  //   this.messages.push(msg);
  // }

  // public getMsg(): NewDesignMsg {
  //   return this.messages.shift();
  // }

  // public isMsgEmpty(): boolean {
  //   return this.messages.length === 0;
  // }


}
