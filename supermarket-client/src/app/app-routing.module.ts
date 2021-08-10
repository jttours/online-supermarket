import { BodyComponent } from './components/main-page/body/body.component';
import { ShoppingPageComponent } from './components/shoppingPage/shopping-page/shopping-page.component';
import { SignInComponent } from './components/main-page/sign-in/sign-in.component';
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
    path: 'signin', component: SignInComponent,
  },
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
