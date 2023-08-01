import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ApiResponseGetRestaurant, ApiResponseProfile } from 'src/app/utils/interfaces';
import { RestaurantService } from '../services/restaurant.service';
import { MainCommon } from 'src/app/utils/main.common';
import { ProductCartService } from '../services/product-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends MainCommon  {
  private toggleButton: any;
  private sidebarVisible: boolean;
  cartProductCount: number = 0;

  constructor(
    private element: ElementRef,
    public productCartService: ProductCartService,
    private _userService: UserService,
    private _restaurantService: RestaurantService,
    private _router: Router,
    private _productService: ProductCartService

  ) {
    super(_userService, _restaurantService, _router, _productService); 
      this.sidebarVisible = false;
      const navbar: HTMLElement = this.element.nativeElement;

      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.productCartService.getProducts().subscribe(data => {
        this.cartProductCount = data.length;
      })
  }

  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      html.classList.add('nav-open');

      this.sidebarVisible = true;
  };
  sidebarClose() {
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      html.classList.remove('nav-open');
  };
  sidebarToggle() {
      // const toggleButton = this.toggleButton;
      // const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  };

  isDocumentation() {
    
  }
}
