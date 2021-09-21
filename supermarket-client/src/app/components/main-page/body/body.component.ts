import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingPageComponent } from '../../shoppingPage/shopping-page/shopping-page.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  numberOfProducts:any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  
    loginForm: FormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });

    


    login() {
      if (this.loginForm.valid) {
        const credentials = this.loginForm.value;
        console.log('credentials -',credentials);
        this.authService.login(credentials);
        
      }
    }

    
    @Input() error: string | null | undefined;
  
    @Output() submitEM = new EventEmitter();
  
  

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  totalProducts(numberOfProducts:number) {
    return this.numberOfProducts;
  }

}
