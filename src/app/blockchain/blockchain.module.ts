import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BlockchainComponent } from './blockchain/blockchain.component';
import { BlockListComponent } from './blockchain/block-list/block-list.component';
import { BlockListItemComponent } from './blockchain/block-list-item/block-list-item.component';
import { BlockListDetailComponent } from './blockchain/block-list-detail/block-list-detail.component';

import { BlockListService } from './blockchain/block-list.service';
import { BlockListDetailService } from './blockchain/block-list-detail/block-list-detail.service';
import { BusinessService } from './blockchain/block-list-detail/transaction-table/business.service';

import { SharedModule } from '../shared/shared.module';
import { TransactionTableComponent } from './blockchain/block-list-detail/transaction-table/transaction-table.component';
// tslint:disable-next-line:max-line-length
import { TransactionTableWidgetComponent } from './blockchain/block-list-detail/transaction-table-widget/transaction-table-widget.component';
import { AppGuardGuard } from '../app-guard.guard';

const bcRoutes: Routes = [
  { path: 'blockchain', component: BlockchainComponent, canActivate: [AppGuardGuard] },
  { path: 'block/:id', component: BlockListDetailComponent, canActivate: [AppGuardGuard] },
  { path: 'business', component: TransactionTableComponent, canActivate: [AppGuardGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(bcRoutes),
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    BlockchainComponent,
    BlockListDetailComponent
  ],
  declarations: [
    BlockchainComponent,
    BlockListComponent,
    BlockListItemComponent,
    BlockListDetailComponent,
    TransactionTableComponent,
    TransactionTableWidgetComponent
  ],
  providers: [
    BlockListService,
    BlockListDetailService,
    BusinessService
  ]
})
export class BlockchainModule { }
