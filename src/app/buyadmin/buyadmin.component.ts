import { Component, Input } from '@angular/core';
import { Product } from 'src/core/product';
import { ProductService } from '../service/product.service';
import { CartegoryService } from '../service/cartegory.service';
import { OrderServices } from '../service/order.service';
@Component({
  selector: 'app-buyadmin',
  templateUrl: './buyadmin.component.html',
  styleUrls: ['./buyadmin.component.css']
})
export class BuyadminComponent {

  @Input() product!: Product;
  products: Product[] = [];
  pdSearch: Product[] = [];
  sum = 0;
  tongtien = 0;
  discount = 0;
  getListPayment: any[] = [];
  nameVoucher = "";
  error = "";
  status: boolean = false;
  getListVouncher: any[] = [];
  orderResponse: any;
  change = 0;
  numberOfProduct = 0;
  searchText: string = '';
  cartProducts: any;
  productDetail: Product = new Product;
  cartProductsByPayment: any[] = []; //sản phẩm trong giỏ hàng CartItem

  constructor(private productService: ProductService,
    private cartService: CartegoryService, private oderService: OrderServices,) { }
  ngOnInit(): void {
    var lstCart: any = [];

    this.loadProducts();
    this.productService.getCartItem().subscribe((response: any) => {
      this.cartProductsByPayment = response.data.cartItem;
      lstCart = response.data.cartItem;
      //Tính số lượng * đơn giá
      this.numberOfProduct = response.data.cartItem.length;
      this.sum = response.data.cartItem.reduce((next: any, prev: any) => {
        return next + prev.price * prev.quantity;
      }, 0);
      this.tongtien = this.sum - this.discount;
    });
    this.productService.getListVouncher().subscribe((response: any) => {
      this.getListVouncher = response.data.lstVoucher;
    });
    this.productService.getListPayment().subscribe((response: any) => {
      this.getListPayment = response.data.getLstPaymentMethod;
    });
    setTimeout(() => {
      if (lstCart.length > 0) {
        this.ConfirmOder();
      }
    }, 5000);
  }
  loadProducts(): void {
    this.productService.getListProduct().subscribe((response: any) => {
      this.products = response.data.lstProduct
      console.log(this.products)
    });
  }
  loadProductsSearch(): void {
    this.productService.getListProductSearch(this.searchText).subscribe((response: any) => {
      this.products = response.data.lstProduct
      console.log(this.products)
    });
  }
  addToCartProduct(productId: string, quantity: number) {
    this.productService.addToCart(productId, quantity, true)
      .subscribe(
        data => {
          console.log(data);
          if (data.status == "200") {
            alert('thêm sản phẩm vào giỏ hàng thành công');
            this.productService.getCartItem().subscribe((response: any) => {
              this.cartProductsByPayment = response.data.cartItem;
              this.numberOfProduct = response.data.cartItem.length;
              this.sum = response.data.cartItem.reduce((next: any, prev: any) => {
                return next + prev.price * prev.quantity;
              }, 0);
              this.tongtien = this.sum - this.discount;
            });
          } else {
            alert('Sản phẩm không đủ số lượng để thêm vui lòng liên hệ cửa hàng.');
          }
        },
        error => {
          console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
          // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
          alert('Sản phẩm đã hết hàng.');
        }
      );
  }

  onChangePayMoney(e: any) {
    this.change = Number(e.target.value) - this.tongtien
  }
  onFindVoucher(e: any) {
    this.nameVoucher = e.target.value;
    if (e.target.value.length === 0) {
      this.error = "";
    }
  }
  handleUseVoucher() {
    let resule = this.getListVouncher.find((x: any) => x.code === this.nameVoucher && x.type == "discount");
    if (resule) {
      this.error = "";
      this.ConfirmOder();
    } else {
      this.error = "Mã giảm giá không tồn tại";
    }
  }
  hanldeRemoveCartItem = (cart: any) => {
    this.status = true;
    this.productService.deleteCartItem(cart.cartDetailID).subscribe(data => {
      alert('Xóa sản phẩm thành công')
      this.productService.getCartItem().subscribe((response: any) => {
        this.cartProductsByPayment = response.data.cartItem
        this.sum = response.data.cartItem.reduce((next: any, prev: any) => { return (next + prev.price * prev.quantity) }, 0)
      })
      this.status = false;

    })
  }

  ConfirmOder() {
    let cartId = this.cartProductsByPayment.map(
      (response: any) => response.cartDetailID
    );
    let voucher = []
    if (this.nameVoucher) {
      let resule = this.getListVouncher.find((x: any) => x.code === this.nameVoucher && x.type == "discount");
      if (resule) {
        voucher.push(resule.id.toString())
      }

    }
    let payload: any = {
      CartDetailID: cartId,
      voucherID: voucher.length > 0 ? voucher : [""],
      PaymentMenthodID: this.getListPayment[0].id,
    };
    if (voucher.length == 0) {
      delete payload.voucherID;
    }
    this.
      oderService.createOder(
        payload.CartDetailID,
        this.getListPayment[0].id,
        payload.AddressDeliveryId,
        payload.voucherID
      )
      .subscribe((data) => {
        this.orderResponse = data.data;
        console.log(data.data)
        if (data.data) {
          this.tongtien = data.data.totalAmount ? data.data.totalAmount : 0;
          let result = this.getListVouncher.find((x: any) => x.code === this.nameVoucher && x.type == "discount")
          if (this.nameVoucher && result) {
            if (result.unit == "%") {
              this.discount = result.unit * this.tongtien
            } else {
              this.discount = result.discount;
            }
          }
          this.tongtien = this.tongtien - this.discount;
        }
      });
  }

  onConfirmOrder() {
    let cartId = this.cartProductsByPayment.map(
      (response: any) => response.cartDetailID
    );
    let voucher = []
    if (this.nameVoucher) {
      let resule = this.getListVouncher.find((x: any) => x.code === this.nameVoucher && x.type == "discount");
      if (resule) {
        voucher.push(resule.id.toString())
      }

    }

    let payload: any = {
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
      description: 'không comment',
      cartDetailId: cartId,
      totalAmountDiscount: 0,
      amountShip: this.orderResponse.amountShip,
      voucherID: voucher.length > 0 ? voucher : [""],
      totalAmount: this.orderResponse.totalAmount,
      PaymentMenthodID: this.getListPayment[0].id,
    };
    if (voucher.length == 0) {
      delete payload.voucherID;
    }
    this.oderService.confirmOrder(payload).subscribe((res) => {
      // this.cartProductsByPayment = [];
      // this.confirmResponse = res.data;

      if (res.status !== "200") {
        alert('Cos lỗi xảy ra lỗi');
      } else {
        alert('Đặt hàng thành công');
      }
    });
  }
  searchProducts() {
    // Gọi service để tìm kiếm sản phẩm dựa trên searchText
    // Lưu ý: Cần phải triển khai service để thực hiện chức năng tìm kiếm
    // Ví dụ: this.productService.searchProducts(this.searchText).subscribe(result => { this.productList = result; });
  }
}
