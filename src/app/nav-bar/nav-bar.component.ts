import { CartService } from './../requests/cart.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  cart= faCartShopping
  cartItems:number=0
  constructor(private cartService : CartService){
  }
  ngOnInit() {
    this.cartService.getCart().subscribe(data=> this.cartItems = data.length)
  }

}
