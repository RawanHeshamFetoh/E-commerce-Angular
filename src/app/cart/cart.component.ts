import { ProductsService } from './../requests/products.service';
import { Component } from '@angular/core';
import { CartService } from '../requests/cart.service';
import { Product } from '../type/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  delete =faTrash
  cartItems: number[] = [];
  cart !: { id: number, amount: number }[]
  productsDetail !: Product;
  amount !: [number]
  totalPrice :number = 0
  cartProducts: { data: Product, amount: number }[] = []
  loaded:boolean = false
  constructor(private cartService: CartService, private productsService: ProductsService) { }
  ngOnInit(): void {
    this.loadData()
    if(this.loaded){
      
    }
  }
  loadData(){
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data
      this.cart = this.convertCartItemsToCart(this.cartItems)
    })

    for (let i = 0; i < this.cart.length; i++) {
      let productId = (this.cart[i].id).toString();
      this.productsService.getProductDetail(productId.toString()).subscribe(data => {

        this.productsDetail = data

        this.cartProducts.push({ data: data, amount: this.cart[i].amount })
        this.calculateTotalPrice()
        
      })
      
    }
    this.loaded=true
    
  }
  

  convertCartItemsToCart(cartItems: number[]): { id: number, amount: number }[] {

    const itemCount: { [key: number]: number } = {};


    cartItems.forEach(id => {
      if (itemCount[id]) {
        itemCount[id]++;
      } else {
        itemCount[id] = 1;
      }
    });


    return Object.keys(itemCount).map(id => ({
      id: +id,
      amount: itemCount[+id]
    }));
  }
  increAmount(product: { data: Product, amount: number }) {
    if (product.amount < product.data.stock) {
      product.amount += 1
      this.cartItems.push(product.data.id)
      this.cartService.updateCart(this.cartItems)
      this.totalPrice += product.data.price
    }

  }
  decreAmount(product: { data: Product, amount: number }) {
    product.amount -= 1
    let indexOfItem = this.cartItems.indexOf(product.data.id)
    if (indexOfItem > -1) {
      this.cartItems.splice(indexOfItem, 1)
      this.cartService.updateCart(this.cartItems)
      this.totalPrice -= product.data.price
    }
  }
  removeItem(product: { data: Product, amount: number }){
  this.cartItems= this.cartItems.filter( item => {return item !== product.data.id})
  this.cartService.updateCart(this.cartItems)
  this.cartProducts=[]
    this.loadData()

  }
  calculateTotalPrice() {
    this.totalPrice = this.cartProducts.reduce((total, product) => {
      return total + (product.data.price * product.amount);
    }, 0);
    this.totalPrice = Math.round(this.totalPrice)
    console.log('Total Price:', this.totalPrice);
  }
}
