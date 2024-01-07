import { Component,ElementRef,Input,OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/core/category';
import { CartegoryService } from '../service/cartegory.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input()
  category : Category = new Category();
  
  categorys: Category[] = [];
  title:any;
  selected: any;
  selectedFile: File | null = null;
  api_key = '284335524597493';
  upload_preset = 'vanh2204';
  public_id : string = '';
  secure_url: string | undefined;

  ngOnInit(){
    this.categortService.getListCategory().subscribe((response: any) => {
      this.categorys = response.data.lstCategory
      console.log(this.categorys)
    })
  }
  constructor(
    public categortService : CartegoryService,
    private httpClient : HttpClient,
  ){}
  //lưu sản phẩm
  saveProduct(){
    this.categortService.createCategory(this.category).subscribe(data =>{
      this.categortService.getListCategory().subscribe((response: any) => {
        this.categorys = response.data.lstCategory
      })
    },
    error => console.log(error));
  }
  onSubmit(){
    this.saveProduct();
    this.clearFormData();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const formData = new FormData();
      formData.append('file',event.target.files[0], event.target.files[0].name);
      formData.append('api_key', this.api_key);
      formData.append('upload_preset', this.upload_preset);
      formData.append('imageName', this.public_id);
      console.log(formData)
      this.categortService.upLoadImage(formData).subscribe((response:any) => {
        console.log('Image uploaded successfully: URL', response.secure_url);
        this.setImageUrl(response.secure_url);
      },
      error => {
        console.error('Error uploading image:', error);
      });
  }
  setImageUrl(image: any){
    this.category.UrlImage = image
    console.log(image)
  }
  clearFormData() {
    this.category = {
      id : '',
      name: '',
      status: null,
      description: '',
      UrlImage : '',
      image:'',
      token : '',
      TypeImage: '',
    };
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  onEdit(ct:any){
    this.selected = ct;
      this.category = ct;
    // Kiểm tra nếu có sự thay đổi chưa lưu
    if (this.isDataChanged()) {
      // Hiển thị cảnh báo hoặc thực hiện xử lý khác
      this.selected = ct;
      this.category = ct;
      console.log('Dữ liệu đã thay đổi, bạn có muốn tiếp tục?');
    } else {
      // Nếu không có thay đổi, thực hiện chỉnh sửa

      this.title = 'Sửa nhà cung cấp';
    }
  }
  isDataChanged(): boolean {
    // So sánh dữ liệu hiện tại với dữ liệu ban đầu
    return JSON.stringify(this.selected) !== JSON.stringify(this.category);

  }
    
}
