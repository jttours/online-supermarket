import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CustomValidationService } from '../../../services/custom-validation.service';


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  // registerForm!: FormGroup;
  submitted: boolean = false;
  data: Object | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService
  ) { }

  
    registerForm = this.formBuilder.group({
      idNumber: ['',Validators.required],
      username: ['',Validators.required, Validators.email],
      password1: ['',Validators.required],
      password2: ['',Validators.required],
      city: [''],
      street: [''],
      firstName: [''],
      lastName: [''],
    })
  

  

  cities: City[] = [
    {value: 'Jerusalem', viewValue: 'Jerusalem'},
    {value: 'Jaffa', viewValue: 'Jaffa'},
    {value: 'Haifa', viewValue: 'Haifa'}
  ];

 

  

  ngOnInit(): void {
    
    
    
    // ,
    //   {
    //   validator: this.customValidator.MustMatch('password', 'password2'),
    //   }
    // );
  }

  registerUser(){
    this.submitted = true;
    console.log(this.registerForm.value)
  }


}
  // registerForm!: FormGroup;
  // submitted = false;

  // idFormControl = new FormControl('', [
  //   Validators.required,
  // ]);

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  // ]);

  // password2FormControl = new FormControl('', [
  //   Validators.required,
  // ]);


   // matcher = new MyErrorStateMatcher();
  
  // registerForm: FormGroup = new FormGroup({
  //     userId: new FormControl(''),
  //     email: new FormControl(''),
  //     password: new FormControl(''),
  //     password2: new FormControl(''),
  //     city: new FormControl(''),
  //     street: new FormControl(''),
  //     firstName: new FormControl(''),
  //     lastName: new FormControl(''),
  //   });

  //   submit() {
  //     if (this.registerForm.valid) {
        
  //       this.submitEM.emit(this.registerForm.value);
  //       console.log(this.registerForm.value);
  //     }
  //   }

  //   @Input() error: string | null | undefined;
  
  //   @Output() submitEM = new EventEmitter();
//   get registerFormControl() {
//     return this.registerForm.controls;
//   }

//   submit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.registerForm.invalid) {
//         return;
//     }

//     // display form values on success
//     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
// }

// onReset() {
//     this.submitted = false;
//     this.registerForm.reset();
// }

// this.registerForm = this.fb.group({
    //   userId: ['',Validators.required],
    //   email: ['',Validators.required, Validators.email],
    //   password: ['',Validators.required],
    //   password2: ['',Validators.required],
    //   city: [''],
    //   street: [''],
    //   firstName: [''],
    //   lastName: [''],
