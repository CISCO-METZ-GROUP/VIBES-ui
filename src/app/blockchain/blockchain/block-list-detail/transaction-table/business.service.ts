import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../../../shared/models/transaction-model';
import { AppConfig } from '../../../../app-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SmartContractService } from '../../../../smart-contract/smart-contract.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient,
    private smartContractService: SmartContractService
  ) { }

  public load(): Observable<TransactionModel[]> {
    const address = this.smartContractService.getAddress();
    const body = address ? {
      address: address
    } : {};

    return this.http.post(AppConfig.REST_BASE_URL + '/getBuisnessLogs', body).pipe(
      map(res => this.extractObjectData(res, TransactionModel))
    );
  }

  private extractObjectData<T>(data, type: { new (value: any): T}): Array<T> {
    const arr = [];

    data.forEach(item => {
      arr.push(new type(item));
    });

    return arr;
  }
}
