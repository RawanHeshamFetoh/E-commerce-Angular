import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../requests/cart.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, RouterLink, FontAwesomeModule, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() product :any;
cartItems :number[] = [];
rating !:number
amount :number =0
constructor(private router:Router , private cart :CartService){}
ngOnInit() {
  this.rating = Math.round(this.product.rating)
  console.log(this.rating)
  this.cart.getCart().subscribe(data=> this.cartItems = data)
}
faStar=faStar
stars = [1,2,3,4,5];
redirectToDetails(id:number){
this.router.navigate([`/product-detail/${id}`])
}
addToCart(id:number){
  this.cartItems.push(id)
this.cart.updateCart(this.cartItems)
this.amount += 1
}

}
