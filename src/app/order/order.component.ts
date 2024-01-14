import { Component } from '@angular/core';
import { Order } from 'src/core/order';
import { OrderServices } from '../service/order.service';
type comboStatus = {
  id: number;
  value: string;
};
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(public orderServices: OrderServices) { }
  order: Order = new Order();
  comboStatus: comboStatus[] = [];
  lstOrder: Order[] = [];
  idOrder: any;
  idStatus: any;
  ngOnInit() {
    this.orderServices.getListOrder().subscribe((response: any) => {
      this.lstOrder = response.data.orders;
      console.log(this.lstOrder)
    });
  }
  openMoup(status: number, idorder: any) {
    this.genComboStatus(status);
    this.idOrder = idorder;
  }
  genComboStatus = (status: number) => {
    if (status != 1 && status != 2 && status != 0) {
      if (
        status != 5 &&
        status != 6 &&
        status != 4 &&
        status != 7 &&
        status != 8
      ) {
        this.comboStatus = [
          {
            id: 4,
            value: 'Trên đường giao',
          },
        ];
      } else if (status == 5 || status == 6 || status == 8) {
        this.comboStatus = [];
      } else {
        this.comboStatus = [
          {
            id: 8,
            value: 'Không nhận hàng',
          },
          {
            id: 5,
            value: 'Đã nhận hàng',
          },
        ];
      }
    } else {
      this.comboStatus = [
        {
          id: 1,
          value: 'Phê duyệt',
        },
        {
          id: 2,
          value: 'Từ chối',
        },
      ];
    }

    return this.comboStatus;
  };

  GenStatus = (status: number): string => {
    switch (status) {
      case 0:
        return '<div >Chờ duyệt</div>';
      case 1:
        return '<div >Chuẩn bị hàng</div>';
      case 2:
        return '<div>Gửi hàng</div>';
      case 3:
        return '<div>Đã hủy đơn</div>';
      case 4:
        return '<div>Trả hàng </div>';
      case 5:
        return '<div>Trả hàng 1 phần</div>';
      case 6:
        return '<div>Hóa đơn mới tạo, trong thời gian đổi trả.</div>';
      case 7:
        return '<div>Giao thành công</div>';
      default:
        return '<div>Khách hàng không nhận hàng</div>';
    }
  };

  GenClassStatus = (status: number): string => {
    switch (status) {
      case 0:
        return 'yellow';
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'yellow';
      case 4:
        return 'red';
      case 5:
        return 'purple';
      case 6:
        return 'black';
      case 7:
        return 'green';
      default:
        return 'red';
    }
  };
  onSubmit() {
    console.log(this.idStatus);
    console.log(this.idOrder);
    this.orderServices
      .updateStatus(this.idOrder, this.idStatus, 'ok')
      .subscribe((data: any) => {
        this.orderServices.getListOrder().subscribe((response: any) => {
          this.lstOrder = response.data.orders;
          alert('Cập nhật trạng thái thành công');
        });
      });
  }

  onChangeStatus() {
    console.log(this.idStatus);
    console.log(this.idOrder);
    this.orderServices.updateStatusByAdmin(this.idOrder,this.idStatus).subscribe((res:any)=>
    {
      if(res.status == '200'){
        this.orderServices.getListOrder().subscribe((response: any) => {
          this.lstOrder = response.data.orders;
          alert('Cập nhật trạng thái thành công');
        });
      }
      else{
        alert(res.messages)
      }
    })
    
  }
  handleUpdateTrangThai(status: number, id: string) {
    this.orderServices.updateStatus(id, status, 'ok').subscribe((data: any) => {
      this.orderServices.getListOrder().subscribe((response: any) => {
        this.lstOrder = response.data.orders;
        alert('Cập nhật trạng thái thành công');
      });
    });
  }
  Giaohang(id: any) {

  }
  createOderGHN(orderId: string) {
    this.orderServices.OderGNH(orderId).subscribe(data => {
      console.log(data);
      if (data.status == "200") {
        alert(data.messages)
        console.log(data.messages)
      } else {
        alert(data.messages)
        console.log(data.messages)
      }
    },
      error => {
        console.error('Lỗi', error);
      }
    );
  }
}
