import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailStateService } from '../../data-access/products-detail-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  providers:[ProductDetailStateService],
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductDetailStateService).state;
  id = input.required<string>();
  
  constructor(){
    effect(()=>{
      console.log(this.id())
      this.productDetailState.getById(this.id())
    })
  }

}
