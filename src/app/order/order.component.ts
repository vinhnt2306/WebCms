import { Component } from '@angular/core';
import { Order } from 'src/core/order';
import { OrderServices } from '../service/order.service';
type comboStatus = {
  id: number,
  value: string
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})


export class OrderComponent {
  constructor(
    public orderServices: OrderServices,
  ) { }
  order: Order = new Order();
  comboStatus: comboStatus[] = [];
  lstOrder: Order[] = [];
  ngOnInit() {
    this.orderServices.getListOrder().subscribe((response: any) => {
      this.lstOrder = response.data.orders
    })
  }
  openMoup(status: number) {
    this.genComboStatus(status)
  }
  genComboStatus = (status: number) => {
    if (status == 1) {
      this.comboStatus = [{
        id: 2,
        value: "Gửi hàng"
      }, {
        id: 3,
        value: "Hủy đơn"
      }]
    }

    return this.comboStatus;
  }

  GenStatus = (status: number): string => {
    switch (status) {
      case 1:
        return '<div >Đang chuẩn bị hàng</div>';
      case 2:
        return '<div>Đang gửi hàng </div>';

      case 3:
        return '<div>Đã hủy đơn</div>';

      case 4:
        return '<div>Trả hàng </div>';
      case 5:
        return '<div>Trả hàng 1 phần </div>';
      case 6:
        return '<div>Chờ duyệt</div>';
      case 7:
        return '<div>Giao thành công</div>';
      default:
        return '';
    }
  };

  GenClassStatus = (status: number): string => {
    switch (status) {
      case 1:
        return 'PREPARE_GOODS';
      case 2:
        return 'SHIPPED';
      case 3:
        return 'CANCELLED';
      case 4:
        return 'RETURNS_PRODUCT';
      case 5:
        return 'PARTIAL_REFUND';
      case 6:
        return 'THE_RETURN_PERIOD';
      default:
        return 'DONE';
    }
  };
  onSubmit() { }
}
