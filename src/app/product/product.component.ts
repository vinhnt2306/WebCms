import { Component,Input ,OnInit,ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from 'src/core/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/core/category';
import { CartegoryService } from '../service/cartegory.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  //nhập product
  @Input()
  product : Product = new Product();

  products: Product[] = [];

  categorys: Category[] = [];
  //upload ảnh
  selectedFile: File | null = null;
  api_key = '284335524597493';
  upload_preset = 'vanh2204';
  public_id : string = '';
  secure_url: string | undefined;
  //
  constructor(
    public productService: ProductService,
    public categortService : CartegoryService
  ){}

  ngOnInit() {
      this.productService.getListProduct().subscribe((response: any) => {
      this.products = response.data.lstProduct
    })
    this.categortService.getCategory().subscribe((response: any) => {
      this.categorys = response.data.lstCategory
    })
  }
  //lưu sản phẩm
  saveProduct(){
    this.productService.createProduct(this.product).subscribe(data =>{
      this.productService.getListProduct().subscribe((response: any) => {
        this.products = response.data.lstProduct
      })
    },
    error => console.log(error));
  }
  //submit save
  onSubmit(){
    console.log(this.product);
    this.saveProduct();
    this.clearFormData();
  }
  //chọn ảnh
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const formData = new FormData();
      formData.append('file',event.target.files[0], event.target.files[0].name);
      formData.append('api_key', this.api_key);
      formData.append('upload_preset', this.upload_preset);
      formData.append('imageName', this.public_id);
      console.log(formData)
      this.productService.upLoadImage(formData).subscribe((response:any) => {
        console.log('Image uploaded successfully: URL', response.secure_url);
        this.setImageUrl(response.secure_url);
      },
      error => {
        console.error('Error uploading image:', error);
      });
  }

  setImageUrl(image: any){
    this.product.UrlImage = image
    console.log(image)
  }

  clearFormData() {
    this.product = {
      id : '',
      name: '',
      code:'',
      price: null,
      quantity: null,
      status: null,
      description: '',
      priceNet: null,
      UrlImage : '',
      image:'',
      CategoryId: '',
      token : '',
      TypeImage: '',
    };
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

}
