import { Component, OnInit } from '@angular/core';
import { CoreService } from './shared/core.service';
import { Tier1Service } from './tier1/tier1.service';
import { OemService } from './oem/oem.service';
import { SmartContractService } from './smart-contract/smart-contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isWorking: boolean;

  constructor(
    private coreService: CoreService,
    private OEMService: OemService,
    private tier1Service: Tier1Service,
    private smartContractService: SmartContractService
  ) { }

  ngOnInit() {
    this.isWorking = false;

    this.coreService.isWorkingSubject.subscribe(
      val => this.isWorking = val
    );

    this.smartContractService.contractDeployedSubject.subscribe(
      val => {
        if (val && !this.isWorking) {
          this.OEMService.connectWS().subscribe(
            res => {
              console.log(res);
              this.OEMService.oemMsg.next(res);
            }
          );

          this.tier1Service.connectWS().subscribe(
            res => {
              console.log(res);
              this.tier1Service.tier1Msg.next(res);
            }
          );
        }
      }
    );
  }

}
