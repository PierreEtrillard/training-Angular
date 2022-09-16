import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUrl: string = "";
  title: string = "";
  private router: Router;  
  ngOnInit() {
   this.changeTitle()
  }
  onContinue() { this.router.navigateByUrl('facesnaps') }
  changeTitle() {
    setTimeout(() => {
      this.currentUrl = document.location.href;
    this.title = this.currentUrl.substring(this.currentUrl.lastIndexOf("/") + 1)
    }, 30);
  }
}
