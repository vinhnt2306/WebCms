import { Component,Input,OnInit } from '@angular/core';
import { Category } from 'src/core/category';
import { CartegoryService } from '../service/cartegory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input()
  category : Category = new Category();

  categorys: Category[] = [];

  ngOnInit(){
    this.categortService.getCategory().subscribe((response: any) => {
      this.categorys = response.data.lstCategory
    })
  }
  constructor(
    public categortService : CartegoryService
  ){}
}
