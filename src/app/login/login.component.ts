import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private getVertification: string = "获取验证码"; //验证码显示文字
  private second:number = 5; //剩余时间
  private timer; //定时器
  private isSending=false; //是否正在发送验证码

  constructor(private route:Router) { }

  ngOnInit() {

  }

  // 更新验证码按钮样式
  getVertif(){
    if(this.isSending){
      return;
    }
    this.isSending = true;
    this.timer = setInterval(() => {
      if(this.second<=0){
        this.getVertification ="获取验证码";
        this.second = 5;
        this.isSending = false;
        clearInterval(this.timer);
      }else{
        this.getVertification = this.second+"s";
        this.second --; 
        this.isSending =true;
      }
    }, 1000);
  }

  // 登录
  login(){
    this.route.navigate(['/home'])
  }
}
