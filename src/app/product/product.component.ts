import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product, ProductUpdate } from 'src/core/product';
import { Category } from 'src/core/category';
import { CartegoryService } from '../service/cartegory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  //nhập product
  @Input()
  product: Product = new Product();

  products: Product[] = [];
  total = 1;
  pageSize = 20;
  loading = false;
  searchText: string = '';
  pageIndex = 1;
  categorys: Category[] = [];
  //upload ảnh
  selectedFile: File | null = null;
  api_key = '284335524597493';
  upload_preset = 'vanh2204';
  public_id: string = '';
  secure_url: string | undefined;
  //
  constructor(
    public productService: ProductService,
    public categortService: CartegoryService,
  ) { }

  ngOnInit() {
    this.productService.getListProduct().subscribe((response: any) => {
      this.products = response.data.lstProduct
      this.total = response.data.totalCount;
    })
    this.categortService.getListCategory().subscribe((response: any) => {
      this.categorys = response.data.lstCategory
    })
  }

  loadProductsSearch(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    } else {

    }
    this.loading = true;
    this.productService
      .getListProductSearch(this.searchText, (this.pageIndex - 1) * 20, 20)
      .subscribe((response: any) => {
        this.loading = false;
        this.total = response.data.totalCount;;
        this.products = response.data.lstProduct;
        console.log('total', this.total)
      });
  }

  //lưu sản phẩm
  saveProduct() {
    if (typeof this.product.UrlImage == "string") {
      this.product.UrlImage = [this.product.UrlImage]

    }
    if (this.product.id) {
      let productupdate: ProductUpdate = { ...this.product, iD: this.product.id }
      this.productService.updateProduct(productupdate).subscribe(data => {
        this.productService.getListProduct().subscribe((response: any) => {
          this.products = response.data.lstProduct
        })
      },
        error => console.log(error));
    } else {
      this.productService.createProduct(this.product).subscribe(data => {
        this.productService.getListProduct().subscribe((response: any) => {
          this.products = response.data.lstProduct
        })
      },
        error => console.log(error));
    }

  }
  //submit save
  onSubmit() {
    console.log(this.product);
    this.saveProduct();
    if (!this.product.id) {
      this.clearFormData();
    }
  }
  //chọn ảnh
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);
    formData.append('api_key', this.api_key);
    formData.append('upload_preset', this.upload_preset);
    formData.append('imageName', this.public_id);
    console.log(formData)
    this.productService.upLoadImage(formData).subscribe((response: any) => {
      console.log('Image uploaded successfully: URL', response.secure_url);
      this.setImageUrl(response.secure_url);
    },
      error => {
        console.error('Error uploading image:', error);
      });
  }
  //set url ảnh
  setImageUrl(image: any) {
    this.product.UrlImage = image
    console.log(image)
  }

  //Edit
  handleUpdate(value: any) {
    this.productService.getProductDetail(value.id).subscribe((response: any) => {
      if (response) {
        this.product = {
          id: response.data.id,
          code: response.data.code,
          description: response.data.description,
          name: response.data.name,
          image: response.data.image[0],
          quantity: response.data.quantity,
          price: response.data.price,
          priceNet: response.data.priceNet,
          status: response.data.status,
          UrlImage: response.data.image[0],
          TypeImage: response.data.TypeImage,
          CategoryId: response.data.categoryId,
          token: ''
        }
        console.log(this.product)
      }
    })
  }
  //xoá dữ liệu form
  clearFormData() {
    this.product = {
      id: '',
      name: '',
      code: '',
      price: null,
      quantity: null,
      status: null,
      description: '',
      priceNet: null,
      UrlImage: '',
      image: '',
      CategoryId: '',
      token: '',
      TypeImage: '',
    };
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
