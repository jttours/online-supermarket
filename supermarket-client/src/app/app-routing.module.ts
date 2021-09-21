import { ItemsComponent } from './components/shoppingPage/items/items.component';
import { BodyComponent } from './components/main-page/body/body.component';
import { ShoppingPageComponent } from './components/shoppingPage/shopping-page/shopping-page.component';
import { RegisterComponent } from './components/main-page/register/register.component';
import { AdminMainComponent } from './components/adminPage/admin-main/admin-main.component';
import { AddProductComponent } from './components/adminPage/add-product/add-product.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', component: BodyComponent, 
  },
  { 
    path: 'shopping', component: ShoppingPageComponent,
  },
  { 
    path: 'register', component: RegisterComponent,
  },
  { 
    path: 'admin', component: AdminMainComponent,
  },
  { 
    path: 'addProduct', component: AddProductComponent,
  },
  { 
    path: 'items', component: ItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
