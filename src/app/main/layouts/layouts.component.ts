import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem('token')
  }

}
