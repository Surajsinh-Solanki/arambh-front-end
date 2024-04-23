import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/product/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  orders: any[] = [];
  media_url = environment.MEDIA_URL

  constructor(
    private orderService: OrderService,
    private toast: ToastrService,
  ) {}
  ngOnInit() {
    this.getUserOrders();
  }

  getUserOrders() {
    this.orderService.GetUserProductOrder().subscribe(
      (res: any) => {
        this.orders = res?.result;
      },
      (error) => {
        if (error.error.code) {
          this.toast.error(error.error.msg);
        } else {
          this.toast.error('An error occurred. Please try again later.');
        }
      },
    );
  }

  cancelOrder(orderId: string) {
    this.orderService.cancelProductOrder(orderId).subscribe((res: any) => {
      if (res.code === 200) {
        this.ngOnInit();
      }
    });
  }
}
