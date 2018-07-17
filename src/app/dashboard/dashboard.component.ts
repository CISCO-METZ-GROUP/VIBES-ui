import { Component, OnInit, OnDestroy } from '@angular/core';
import { SmartContractService } from '../smart-contract/smart-contract.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public isSplashScreenOpened: boolean;
  public isDeployed: boolean;

  private isDoneSubscription: Subscription;

  constructor(
    private smartContractService: SmartContractService
  ) { }

  ngOnInit() {
    this.isSplashScreenOpened = this.smartContractService.openSplash;
    this.isDeployed = this.smartContractService.contractDeployed;
    this.isDoneSubscription = this.smartContractService.contractDeployedSubject.subscribe(
      val => this.isDeployed = val
    );
  }

  ngOnDestroy() {
    this.isDoneSubscription.unsubscribe();
    this.smartContractService.openSplash = false;
  }

  public deploySmartContract() {
    this.isSplashScreenOpened = false;
    this.smartContractService.deployContract();
  }

  public onModalToggle(e) {
    this.smartContractService.contractDeployedSubject.next(true);
  }

}
