import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app-config';
import { Observable } from 'rxjs';
import { TransactionModel } from '../../shared/models/transaction-model';
import { map } from 'rxjs/operators';
import { SmartContractService } from '../../../smart-contract/smart-contract.service';

interface BodyType {
  blockNumber: number;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlockListDetailService {

  constructor(
    private http: HttpClient,
    private smartContractService: SmartContractService
  ) { }

  public load(blockNumber: number): Observable<TransactionModel[]> {
    const address = this.smartContractService.getAddress();
    const body: BodyType = {
      blockNumber: blockNumber
    };

    if (address) {
      body.address = address;
    }

    return this.http.post(AppConfig.REST_BASE_URL + '/getSelectedBlock', body).pipe(
      map(res => this.extractObjectData(res, TransactionModel))
    );
  }

  private extractObjectData<T>(data, type: { new (value: any): T}): Array<T> {
    const arr = [];
    arr.push(new type(data));

    return arr;
  }

}
