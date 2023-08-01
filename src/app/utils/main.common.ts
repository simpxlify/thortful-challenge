import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { Result, ApiResponseProfile, ApiResponseGetRestaurant } from "./interfaces";
import { RestaurantService } from "../shared/services/restaurant.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ProductCartService } from "../shared/services/product-cart.service";

@Component({
    template: '',
  })
  export class MainCommon implements OnInit, OnDestroy {
    private userDataSubscription!: Subscription;
    private restaurantDataSubscription!: Subscription;
    bigUserPicture: string = '';
    allUserData!: Result;
    userPicture: string = '';
    restaurantName: string = '';
  
    constructor(private userService: UserService, private restaurantService: RestaurantService, public router: Router, private productService: ProductCartService) {}
    ngOnInit(): void {
        this.userDataSubscription = this.userService.getUserData().subscribe({
        next: (succeed: ApiResponseProfile) => {
          if (succeed) {
            this.allUserData = succeed.results[0];
            this.bigUserPicture = this.allUserData.picture.large;
            this.userPicture = this.allUserData.picture.thumbnail;
            
          }
        },
        error: (err) => {
          console.log(err);
        },
      });

      this.restaurantDataSubscription = this.restaurantService.getRestaurantData().subscribe({
        next: (succeed: ApiResponseGetRestaurant) => {
            if(succeed){
                this.restaurantName = succeed.name
            }
        },
        error: (err) => {
            console.log(err);
            
        }
      })
    }

    ngOnDestroy(): void {
        if (this.userDataSubscription) {
          this.userDataSubscription.unsubscribe();
        }
        if (this.restaurantDataSubscription) {
          this.restaurantDataSubscription.unsubscribe();
        }
      }
  }