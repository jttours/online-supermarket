import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/main-page/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { BodyComponent } from './components/main-page/body/body.component';
import { SignInComponent } from './components/main-page/sign-in/sign-in.component';
import { MyCartComponent } from './components/shoppingPage/my-cart/my-cart.component';
import { ItemsComponent } from './components/shoppingPage/items/items.component';
import { ShoppingHeaderComponent } from './components/shoppingPage/shopping-header/shopping-header.component';
import { ShoppingPageComponent } from './components/shoppingPage/shopping-page/shopping-page.component';
import { RegisterComponent } from './components/main-page/register/register.component';
import { AddProductComponent } from './components/adminPage/add-product/add-product.component';
import { AdminMainComponent } from './components/adminPage/admin-main/admin-main.component';
import { SearchProductPipe } from './pipes/search-product.pipe';
import { HighlightDirective } from './pipes/highlight.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    SignInComponent,
    MyCartComponent,
    ItemsComponent,
    ShoppingHeaderComponent,
    ShoppingPageComponent,
    RegisterComponent,
    AddProductComponent,
    AdminMainComponent,
    SearchProductPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MDBBootstrapModule.forRoot(),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
