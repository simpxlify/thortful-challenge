import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {
  private show: boolean = false;
  private showSubject: Subject<boolean> = new Subject<boolean>();
  public cartItems = new Array<any>()
  public products = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) { 

    this.cartItems = JSON.parse(localStorage.getItem('cartItems') ||'[]'); // get the data at lunch 
    this.products.next(this.cartItems);
    
  }

  getProducts(): Observable<any> {
    return this.products.asObservable();
  }
 
  // Add single product to the cart
  addProductToCart(product:any) {
    this.cartItems.push(product);
    this.products.next(this.cartItems);
    this.syncLocalStorage()

  }

  // Remove single product from the cart
  removeProductFromCart(productId:any) {
    this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    // Update Observable value
    this.products.next(this.cartItems);
    this.syncLocalStorage();
  }
  
 
  // Remove all the items added to the cart
  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
    this.syncLocalStorage()

  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    let total = 0;

    this.cartItems.map((item) => {
      total += item.price;
    });

    return total;
  }

  toggle() {
    this.show = !this.show;
    this.showSubject.next(this.show);
  }
  setShow(val: boolean) {
    this.show = val;
    this.showSubject.next(this.show);
  }
  getShowStatus(): boolean {
    return this.show;
  }

  getShowStatusObservable(): Observable<boolean> {
    return this.showSubject.asObservable();
  } 
  syncLocalStorage(){
    localStorage.setItem('cartItems',JSON.stringify(this.cartItems)); // sync the data

  }
}

