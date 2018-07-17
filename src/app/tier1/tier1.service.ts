import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreService } from '../shared/core.service';
import { NotificationService } from '../notification/notification.service';
import { AppConfig } from '../app-config';
import { WebsocketService } from '../shared/websocket.service';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NewDesignMsg {
  OEM: string;
  VNETDesignName: string;
}

interface BodyType {
  name: string;
  verdict: string;
  T1Name: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tier1Service {

  // public messages: Subject<NewVerdictMsg> = new Subject();
  // private messages: NewVerdictMsg[] = [];
  public isWorkingSubject: Subject<boolean> = new Subject();
  public tier1Msg: ReplaySubject<NewDesignMsg> = new ReplaySubject(1);
  public deployed: boolean;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private notificationService: NotificationService,
    private webSocketService: WebsocketService
  ) { }

  public deployVerdict(name: string, verdict: string, address: string, T1Name: string) {
    this.isWorkingSubject.next(true);

    const body: BodyType = {
      name: name,
      verdict: verdict,
      T1Name: T1Name
    };

    // if (address) {
    //   body.address = address;
    // }

    this.http.post(AppConfig.REST_BASE_URL + '/addVerdict', body).subscribe(
      res => {
        this.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Successful', 'Verdict Successfully Deployed to Blockchain', 'success');
        this.deployed = true;
      },
      error => {
        this.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Failed', 'Verdict Deployement Has Failed', 'danger');
      }
    );
  }

  public connectWS(): Subject<NewDesignMsg> {
    return <Subject<NewDesignMsg>>this.webSocketService
    .connectOEM(AppConfig.WS_URL + ':8282')
    .pipe(
      map((res: MessageEvent): NewDesignMsg => {
        const data = JSON.parse(res.data);
        const msg = {
          OEM: data.OEM,
          VNETDesignName: data.VNETDesignName
        };

        // this.messages.next(msg);

        return msg;
      })
    );
  }

  public destroyWS() {
    this.webSocketService.closeT1();
  }

  // public addMsg(msg: NewVerdictMsg) {
  //   this.messages.push(msg);
  // }

  // public getMsg(): NewVerdictMsg {
  //   return this.messages.shift();
  // }

  // public isMsgEmpty(): boolean {
  //   return this.messages.length === 0;
  // }

}
