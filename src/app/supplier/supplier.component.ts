import { Component,Input,OnInit } from '@angular/core';
import { Supplier } from 'src/core/supplier';
import { SupplierService } from '../service/supplier.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  @Input()
  supplier : Supplier = new Supplier();
  title : string = "";
  suppliers: Supplier[] = [];
  selected : any;
  ngOnInit(){
    this.supplierSevice.getSupplier().subscribe((response: any) => {
      this.suppliers = response.data.lstSupplier
    })
    console.log(this.suppliers)
  }
  constructor(
    public supplierSevice : SupplierService
  ){}
  saveSupplier(){
    if(!this.supplier.id){
      this.supplierSevice.createSupplier(this.supplier).subscribe(data =>{
        this.supplierSevice.getSupplier().subscribe((response: any) => {
          this.suppliers = response.data.lstSupplier
          alert('Thêm mới thành công')
          this.clearFormData();
          document.getElementById('close')?.click();
        })
      },
      error => console.log(error));
    }else{
      this.supplierSevice.editSupplier(this.supplier.id,this.supplier).subscribe(data =>{
        this.supplierSevice.getSupplier().subscribe((response: any) => {
          this.suppliers = response.data.lstSupplier
          document.getElementById('close')?.click();
        })
      },
      error => console.log(error));
    }

  }
  clearFormData(){
    this.supplier = {} as Supplier
  }
  onEdit(sp:any){
    this.selected = sp;
      this.supplier = sp;
    // Kiểm tra nếu có sự thay đổi chưa lưu
    if (this.isDataChanged()) {
      // Hiển thị cảnh báo hoặc thực hiện xử lý khác
      this.selected = sp;
      this.supplier = sp;
      console.log('Dữ liệu đã thay đổi, bạn có muốn tiếp tục?');
    } else {
      // Nếu không có thay đổi, thực hiện chỉnh sửa

      this.title = 'Sửa nhà cung cấp';
    }
  }
  onSubmit(){
      this.saveSupplier();
  }
  onAdd(){
    this.supplier = {} as Supplier
    console.log(this.supplier)
    this.title ='Thêm nhà cung cấp';
  }
  isDataChanged(): boolean {
    // So sánh dữ liệu hiện tại với dữ liệu ban đầu
    return JSON.stringify(this.selected) !== JSON.stringify(this.supplier);

  }
}
