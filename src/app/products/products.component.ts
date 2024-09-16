import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ProductsService } from '../requests/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsData :any
  skip:number = 0
// url: string = 'assets/data/products.json'
constructor(private productService : ProductsService ) {
}
ngOnInit() {
  // fetch(this.url).then(res => res.json())
  // .then(json => {
  //   this.productsData = json.products ;
  // });

  this.fetchProducts();
}
fetchProducts(): void {
  this.productService.getSpecificProductList(this.skip ).subscribe(data => {
    this.productsData = data.products;
  });
}
prevPage(){
  if(this.skip>0){
    this.skip-=10;
    this.fetchProducts();
  }
}
nextPage(){
  if(this.skip<30){
    this.skip+=10;
    this.fetchProducts();
  }
}
}
