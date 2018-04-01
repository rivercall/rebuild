import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private getVertification: string = "获取验证码";
  private second:number = 60;
  private timer;

  constructor() { }

  ngOnInit() {
    
  }
  nowTest(){
    this.timer = setInterval(() => {
      if(this.second<=0){
        this.getVertification ="获取验证码";
        this.second = 60;
        clearInterval(this.timer);
      }else{
        this.getVertification = this.second+"秒";
        this.second --; 
      }
    }, 1000);
  }
}
