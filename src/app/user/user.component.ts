import { Component,Input } from '@angular/core';
import { User } from 'src/core/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input()
  user : User = new User();
  title : string = "";
  users: User[] = [];
  selected : any;
  ngOnInit(){
    this.userService.getListUser().subscribe((response: any) => {
      this.users = response.data.listUser
    })
    console.log(this.users)
  }
  constructor(
    public userService : UserService
  ){}
  saveUser(){
    this.userService.createUser(this.user).subscribe(data =>{
      this.userService.getListUser().subscribe((response: any) => {
        this.user = response.data.listUser
      })
    },
    error => console.log(error));
  }
  
  onSubmit(){
    this.saveUser();
    this.clearFormData();
  }

  clearFormData() {
    this.user = {} as User
  }
  onEdit(us:any){
    this.selected = us;
      this.user = us;
    // Kiểm tra nếu có sự thay đổi chưa lưu
    if (this.isDataChanged()) {
      // Hiển thị cảnh báo hoặc thực hiện xử lý khác
      this.selected = us;
      this.user = us;
      console.log('Dữ liệu đã thay đổi, bạn có muốn tiếp tục?');
    } else {
      // Nếu không có thay đổi, thực hiện chỉnh sửa

      this.title = 'Sửa nhà cung cấp';
    }
  }
  isDataChanged(): boolean {
    // So sánh dữ liệu hiện tại với dữ liệu ban đầu
    return JSON.stringify(this.selected) !== JSON.stringify(this.user);

  }
}
