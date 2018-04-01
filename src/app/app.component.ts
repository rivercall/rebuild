import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor (private router:Router){
    
  }

  // header组件默认显示
  isHeaderShow:boolean=true;
  // 背景颜色显示
  isBackground:boolean=true;

  ngOnInit(){
    this.router.events.subscribe((event) => {
      // console.log(event)
      if (event instanceof NavigationEnd) {     // 当导航成功结束时执行
        if(event.url=="/home"|| event.url=="/" ||event.url=="/account"){
          this.isHeaderShow =false;
          this.isBackground =true;
        }
        if(event.url=="/login"){
          this.isHeaderShow = true;
          this.isBackground = false;
        }
      }
    });
  }
}
