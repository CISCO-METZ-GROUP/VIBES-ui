import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SmartContractService } from './smart-contract/smart-contract.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private smartContractService: SmartContractService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;
      // if (this.smartContractService.contractDeployed) {
      //   return true;
      // } else {
      //   this.router.navigate(['/dashboard']);
      //   return false;
      // }
  }
}
