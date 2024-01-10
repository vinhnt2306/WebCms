import { Component,Input } from '@angular/core';
import { Product } from 'src/core/product';
import { ProductService } from '../service/product.service';
import { CartegoryService } from '../service/cartegory.service';
@Component({
  selector: 'app-buyadmin',
  templateUrl: './buyadmin.component.html',
  styleUrls: ['./buyadmin.component.css']
})
export class BuyadminComponent {
  
@Input()  product!: Product;
  products : Product[] = [];
  pdSearch : Product[]=[];
  searchText: string = '';
  cartProducts : any;
  productDetail : Product = new Product;

  constructor(private productService:ProductService,
              private cartService:CartegoryService){}
  ngOnInit(): void {
    this.loadProducts();
  //   this.productService.getCartItem().subscribe((response: any) => {
  //     this.cartProducts = response.data.cartItem
  //     console.log(this.cartProducts)
  // })
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
        if(data.status == "200"){
            alert('thêm sản phẩm vào giỏ hàng thành công');
        }else{
          alert('Sản phẩm không đủ số lượng để thêm vui lòng liên hệ cửa hàng.');
        }
      },
      error => {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
        alert('Sản phẩm đã hết hàng.');
      }
    );
  console.log(productId, quantity);
}
searchProducts() {
  // Gọi service để tìm kiếm sản phẩm dựa trên searchText
  // Lưu ý: Cần phải triển khai service để thực hiện chức năng tìm kiếm
  // Ví dụ: this.productService.searchProducts(this.searchText).subscribe(result => { this.productList = result; });
}
}
