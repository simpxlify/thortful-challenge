import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MakeYourPizzaComponent } from './components/make-your-pizza/make-your-pizza.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './shared/cart/cart.component';
import { NgxStripeModule } from 'ngx-stripe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    ProfileComponent,
    MakeYourPizzaComponent,
    MenuComponent,
    CartComponent,
    DashboardComponent,
    ModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
    NgxStripeModule.forRoot('pk_test_51IeZPeLTIvmi9oWfZfFfR1mnnIBWmHNpirpPWGon4AstcxV0d85IzR8wbW0W5X11rK5lkerX5K4K7iXCuN19b7Iw007vusb9Y8')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
  }

}
