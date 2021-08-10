import { Component, OnInit } from '@angular/core';

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  cities: City[] = [
    {value: 'Jerusalem', viewValue: 'Jerusalem'},
    {value: 'Jaffa', viewValue: 'Jaffa'},
    {value: 'tHaifa', viewValue: 'Haifa'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
