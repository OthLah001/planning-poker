import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'payment-info',
  templateUrl: './payment-info.component.html',
})
export class PaymentInfoComponent implements OnInit, OnDestroy {
  public dataLoaded: boolean = false;

  private subs: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    // TO-DO: get payment data

    this.dataLoaded = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
