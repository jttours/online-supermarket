import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AddUserService } from 'src/app/services/add-user.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  data: Object | undefined;

  cities = [
    {  name: "Jerusalem" },
    {  name: "Haifa" },
    {  name: "Tel Aviv" },
    {  name: "Jaffa" },
    {  name: "Dimona" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private addUserService: AddUserService,
    // private customValidator: CustomvalidationService
  ) { }

  createForm() {
    this.registerForm = this.formBuilder.group({
      idNumber: ['',[Validators.required]],
      username: ['',[Validators.required,Validators.email]],
      password1: ['',Validators.required],
      password2: ['',Validators.required],
      city: [''],
      street: [''],
      firstName: [''],
      lastName: [''],
    })
  }  

  ngOnInit(): void {
    this.createForm();
  }

  registerUser(){
    this.submitted = true;
    this.addUserService.insertData(this.registerForm.value).subscribe(res => {
      this.data = res;
      alert("acount transaction added");
      this.registerForm.reset();
    })
  }

}
