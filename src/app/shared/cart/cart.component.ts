import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ProductCartService } from '../services/product-cart.service';
import { StripeService } from 'ngx-stripe';
import { StripeElementsOptions  } from '@stripe/stripe-js';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  show: boolean = false;
  cartItems!: any;
  totalAmmount: number = 0;
  private clickedInside = false;
  elementsOptions: StripeElementsOptions = {
    locale: 'pt'
  };
  paymentHandler: any = null;

  constructor(
    private productCartService: ProductCartService,
    private stripeService: StripeService,
    private restaurantService: RestaurantService
  ) { 


  }

  ngOnInit() {
    
     this.productCartService.getShowStatusObservable().subscribe((show) => {
      this.show = show;
    });
    this.productCartService.getProducts().subscribe(
      data => {
        this.cartItems = data;
        this.totalAmmount = this.productCartService.getTotalPrice();
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
    
    this.invokeStripe();

  }
 
  toggle () {
    this.show = !this.show;
    this.productCartService.setShow(this.show)
  }
  // Remove item from cart list
  removeItemFromCart(productId:any) {
    /* this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.mySharedService.setProducts(this.cartItems); */

    this.productCartService.removeProductFromCart(productId);

  }

  emptyCart() {
    this.productCartService.emptryCart();
  }

  makePayment(amount: any) {
    this.restaurantService.getRestaurantData().subscribe((data:any) => {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51IeZPeLTIvmi9oWfZfFfR1mnnIBWmHNpirpPWGon4AstcxV0d85IzR8wbW0W5X11rK5lkerX5K4K7iXCuN19b7Iw007vusb9Y8',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
        },
      });
      paymentHandler.open({
        name: data.name,
        description: 'CHECKOUT',
        amount: amount * 100,
        currency: 'EUR',
        shippingAddress: {
        },
        image: 'NODATA',
        panelLabel: 'PAGAR',
      });
      this.cartItems = data;
      this.removeElementsByClassName('testMode');

    });

  }

  removeElementsByClassName(className: string) {
    const elements = document.getElementsByClassName(className);
if(elements){
    while (elements.length > 0) {
if(elements[0].parentNode){

      elements[0].parentNode.removeChild(elements[0]);
    }

    }}
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IeZPeLTIvmi9oWfZfFfR1mnnIBWmHNpirpPWGon4AstcxV0d85IzR8wbW0W5X11rK5lkerX5K4K7iXCuN19b7Iw007vusb9Y8',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  
  

}