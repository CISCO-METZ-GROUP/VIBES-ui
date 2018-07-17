import { Component, OnInit, OnDestroy } from '@angular/core';
import { OemService, NewVerdictMsg } from './oem.service';

import { Subscription } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { SmartContractService } from '../smart-contract/smart-contract.service';
import { Tier1Service } from '../tier1/tier1.service';

@Component({
  selector: 'app-oem',
  templateUrl: './oem.component.html',
  styleUrls: ['./oem.component.css']
})
export class OemComponent implements OnInit, OnDestroy {

  public designName: string;
  public notif: NewVerdictMsg;
  public isWorking: boolean;

  private OEMName: string;
  private newVerdictSubscription: Subscription;
  private isWorkingSubscription: Subscription;

  constructor(
    private OEMService: OemService,
    private tier1Service: Tier1Service,
    private notificationService: NotificationService,
    private smartContractService: SmartContractService
  ) { }

  ngOnInit() {
    this.notif = null;
    this.OEMName = 'OEM2';
    this.OEMService.deployed = this.OEMService.deployed ? true : false;

    if (this.tier1Service.deployed) {
      this.tier1Service.deployed = false;

      this.newVerdictSubscription = this.OEMService.oemMsg.subscribe(
        res => {
          // console.log(res);
          this.notif = res;
        }
      );
    }

    this.isWorkingSubscription = this.OEMService.isWorkingSubject.subscribe(
      val => {
        this.isWorking = val;

        if (val === false) {
          setTimeout(() => {
            this.tier1Service.tier1Msg.next({
              OEM: 'OEM2',
              VNETDesignName: this.designName
            });
          }, 0);
        }
      }
    );
  }

  ngOnDestroy() {
    // this.OEMService.destroyWS();
    if (this.newVerdictSubscription) {
      this.newVerdictSubscription.unsubscribe();
    }

    this.isWorkingSubscription.unsubscribe();
  }

  public selectDesign(e: Event, name: string) {
    this.setClasses(e);
    this.designName = name;
  }

  public deployDesign() {
    this.OEMService.deployDesign(this.designName, this.OEMName, this.smartContractService.getAddress());
  }

  public pushNotification() {
    if (this.notif) {
      this.notificationService.openModal('New Verdict', 'New Verdict Arrived for \'' + this.notif.VNETDesignName + '\'', 'info');
      this.notif = null;
    }
  }

  private setClasses(e: Event) {
    if (e.target['className'] !== 'img-wrap') {
      const selEl = document.querySelector('.selected');

      if (selEl) {
        selEl.classList.remove('selected');
      }

      const clickElement: Element = e.target['parentNode']['parentNode'];
      clickElement.classList.add('selected');
    }
  }

}
