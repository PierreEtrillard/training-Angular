import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
styleSelected:string='';
names:string = "";
  constructor() { }
  ngOnInit(): void {
  }
  
  darkStyle(styleColor:string){
  console.log(`${styleColor} est sélectionné`)
  this.styleSelected=`${styleColor}`
}
  blueStyle(styleColor:string){
  console.log(`${styleColor} est sélectionné`)
  this.styleSelected=`${styleColor}`
}
  greenStyle(styleColor:string){
  console.log(`${styleColor} est sélectionné`)
  this.styleSelected=`${styleColor}`
}
}
