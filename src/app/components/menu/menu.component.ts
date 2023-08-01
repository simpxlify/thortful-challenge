import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ProductCartService } from 'src/app/shared/services/product-cart.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ApiResponseGetRestaurant, PizzaProds } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  products: any = [];
  private singleProduct!: any[];
  isAdded!: any[];

  constructor(
    private renderer: Renderer2,
    public productCartService: ProductCartService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {

    this.isAdded = new Array(this.products.length);
    this.isAdded.fill(false, 0, this.products.length);

    this.productCartService.getProducts().subscribe((data: any ) => {

      if (data && data.length > 0) {

      } else {
        this.products.map((item: any, index: any) => {
          this.isAdded[index] = false;
        });
      }

    });

    this.restaurantService.getDataProducts().subscribe({
      next: (succeed: PizzaProds[]) => {
        if(succeed){
          succeed.forEach((product) => {
            product.image = "../../../assets/pizza-maker/pizza_pepe.png"
          });
          this.products = succeed
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
      
  }

  
  // Add item in cart on Button click
  // ===============================
  addToCart(event: any, productId: any): any {
    // If Item is already added then display alert message
    if (event.target.classList.contains('btn-success')) {
      alert('This product is already added to the cart.');
      return false;
    }
  
    this.products.map((item: any, index: any) => {
      if (item.id === productId) {
        this.isAdded[index] = true;
      }
    });
  
    this.singleProduct = this.products.filter((product: any) => {
      return product.id === productId;
    });
    
    this.productCartService.addProductToCart(this.singleProduct[0]);
  }
  

}