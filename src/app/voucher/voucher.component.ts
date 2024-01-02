import { Component, Input } from '@angular/core';
import { Category } from 'src/core/category';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent {
  @Input()
  category: Category = new Category();

  categorys: Category[] = [];
  constructor() {}
}
