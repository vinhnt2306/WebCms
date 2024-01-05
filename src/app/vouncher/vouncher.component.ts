import { Component,Input } from '@angular/core';
import { Vouncher } from 'src/core/vouncher';

@Component({
  selector: 'app-vouncher',
  templateUrl: './vouncher.component.html',
  styleUrls: ['./vouncher.component.css']
})
export class VouncherComponent {
  @Input()
  vouncher : Vouncher = new Vouncher();

  selected : any;
  onSubmit(){}
  
  onFileSelected(){}
  isDataChanged(): boolean {
    // So sánh dữ liệu hiện tại với dữ liệu ban đầu
    return JSON.stringify(this.selected) !== JSON.stringify(this.vouncher);

  }
}
