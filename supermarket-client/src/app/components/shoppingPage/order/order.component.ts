import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  shoppingComplete: boolean = false;
  @Output() orderProducts = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  goToOrderForm(){
    this.shoppingComplete=false;
    this.orderProducts.emit(this.shoppingComplete);
  }

}
