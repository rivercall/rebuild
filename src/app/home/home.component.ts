import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private phoneNumber:string;
  isLogin:boolean = false;
  isLoginText:string;

  // 读取登录信息
  constructor(private route:Router) { 
    this.phoneNumber = localStorage.getItem("phoneNumber");
    if(this.phoneNumber){
      this.isLogin = true;
    }
  }
  
  ngOnInit() {
    if(this.isLogin){
      this.isLoginText = "用户已登录"
    }else{
      this.isLoginText = '请登录'
    }
  }

  // 跳转至个人页面
  toAccount(){
    if(this.isLogin){
      this.route.navigate(['/account'])
    }else{
      this.route.navigate(['/login'])
    }
  }
}
