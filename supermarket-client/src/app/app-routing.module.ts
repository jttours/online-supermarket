import { BodyComponent } from './components/main-page/body/body.component';
import { ShoppingPageComponent } from './components/shoppingPage/shopping-page/shopping-page.component';
import { RegisterComponent } from './components/main-page/register/register.component';
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
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
