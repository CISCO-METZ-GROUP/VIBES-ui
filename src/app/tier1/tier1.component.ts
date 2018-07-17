import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tier1Service, NewDesignMsg } from './tier1.service';
import { OemService } from '../oem/oem.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { SmartContractService } from '../smart-contract/smart-contract.service';

@Component({
  selector: 'app-tier1',
  templateUrl: './tier1.component.html',
  styleUrls: ['./tier1.component.css']
})
export class Tier1Component implements OnInit, OnDestroy {

  public designName;
  public notif: NewDesignMsg;
  public verdict: string;
  public progress: number;
  public isWorking: boolean;

  private newDesignSubscription: Subscription;
  private isWorkingSubscription: Subscription;

  constructor(
    private tier1Service: Tier1Service,
    private oemService: OemService,
    private notificationService: NotificationService,
    private smartContractService: SmartContractService
  ) { }

  ngOnInit() {
    // this.designName = 'ECUv1Update';
    this.notif = null;
    // this.designName = this.oemService.deployedName;
    this.progress = 0;
    this.tier1Service.deployed = this.tier1Service.deployed ? true : false;

    if (this.oemService.deployed) {
      this.oemService.deployed = false;

      this.newDesignSubscription = this.tier1Service.tier1Msg.subscribe(
        res => {
          // console.log(res);
          this.notif = res;
          this.designName = res.VNETDesignName;
        }
      );
    }

    this.isWorkingSubscription = this.tier1Service.isWorkingSubject.subscribe(
      val => {
        this.isWorking = val;

        if (val === false) {
          setTimeout(() => {
            this.oemService.oemMsg.next({
              T1name: 'Bosch',
              Verdict: this.verdict,
              VNETDesignName: this.oemService.deployedName
            });
          }, 0);
        }
      }
    );
  }

  ngOnDestroy() {
    // this.tier1Service.destroyWS();
    if (this.newDesignSubscription) {
      this.newDesignSubscription.unsubscribe();
    }

    this.isWorkingSubscription.unsubscribe();
  }

  public deployVerdict() {
    this.tier1Service.deployVerdict(this.designName, this.verdict, this.smartContractService.getAddress(), 'Bosch');
  }

  public validate() {
    this.progress = 0;

    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2;
      } else {
        clearInterval(interval);
        this.notificationService.openModal('Validation', 'Validation Has Finished Successfully', 'success');
      }
    }, 60);
  }

  public pushNotification() {
    if (this.notif) {
      this.notificationService.openModal(
        'New VNet Design', '\'' + this.notif.OEM + '\' deployed \'' + this.notif.VNETDesignName + '\'', 'info');
      this.notif = null;
    }
  }

}
