import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  constructor() { }

  nowDate = new Date();
  public appVersion;
  public currentYear; 

  ngOnInit(): void {
    this.appVersion = "1.0.0";
    this.currentYear = DateTime.now().toFormat('y');
  }

}
