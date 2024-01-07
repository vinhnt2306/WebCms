import { Component,Input } from '@angular/core';
import { Vouncher } from 'src/core/vouncher';
import { VouncherService } from '../service/vouncher.service';
@Component({
  selector: 'app-vouncher',
  templateUrl: './vouncher.component.html',
  styleUrls: ['./vouncher.component.css']
})
export class VouncherComponent {
  @Input()
  vouncher : Vouncher = new Vouncher();
  
  vounchers: Vouncher[] = [];
  title:any;
  selected : any;
  constructor(
    private vouncherService : VouncherService
  ){

  }
  ngOnInit(){
    this.vouncherService.getListVouncher().subscribe((response: any) => {
      this.vounchers = response.data.lstVoucher
    })
  }
  //lưu vouncher
  saveVouncher(){
    this.vouncherService.createVouncher(this.vouncher).subscribe(data =>{
      this.vouncherService.getListVouncher().subscribe((response: any) => {
        this.vounchers = response.data.lstVoucher
      })
    },
    error => console.log(error));
  }
  onSubmit(){
    this.saveVouncher();
  }
  
  onEdit(vc:any){
    this.selected = vc;
      this.vouncher = vc;
    // Kiểm tra nếu có sự thay đổi chưa lưu
    if (this.isDataChanged()) {
      // Hiển thị cảnh báo hoặc thực hiện xử lý khác
      this.selected = vc;
      this.vouncher = vc;
      console.log('Dữ liệu đã thay đổi, bạn có muốn tiếp tục?');
    } else {
      // Nếu không có thay đổi, thực hiện chỉnh sửa

      this.title = 'Sửa nhà cung cấp';
    }
  }
  isDataChanged(): boolean {
    // So sánh dữ liệu hiện tại với dữ liệu ban đầu
    return JSON.stringify(this.selected) !== JSON.stringify(this.vouncher);

  }
}
