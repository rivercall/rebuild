import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { Observable} from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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

  phoneNumber:number ; //手机号
  vertification:number; //验证码

  // 请求头设置
  private headers:Headers;
  private options:RequestOptions;

  // 登陆信息
  private loginInfo:any;

  constructor(private route:Router, private http:Http) { 
    this.headers = new Headers({ 
      'Content-Type': 'application/json;charset=UTF-8'
     });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {

  }

  // 更新验证码按钮样式
  getVertif(){
    if(this.isSending){
      return;
    }
    this.isSending = true;
    this.phoneNumber=18621856558;
    this.vertification = 123456;
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
  // 手机号校验
  isPhoneNumber:boolean = true;
  checkPhoneNumber(phoneNumber){
    var phonereg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!phoneNumber.trim()){
      this.isPhoneNumber = true;
    }else if(!phonereg.test(phoneNumber)){
      this.isPhoneNumber = false;
    }else{
      this.isPhoneNumber = true;
    }
  }
  // 验证码校验
  isVertification:boolean = true;
  checkVertfication(vertification){
    var phonereg=/^\d{6}$/;
    if(!vertification.trim()){
      this.isVertification = true;
    }else if(!phonereg.test(vertification)){
      this.isVertification = false;
    }else{
      this.isVertification = true;
    }
  }

  // 登录
  obj:object = { };
  login(){
    if(this.phoneNumber==undefined||this.isPhoneNumber == false){
      alert("手机号错误")
      return;
    }
    if(this.vertification==undefined||this.isVertification == false){
      alert("验证码错误")
      return;
    }
    this.obj={
      phoneNumber:this.phoneNumber,
      code:this.vertification
    }
    // {phoneNumber:18621856558,code:123456}
    this.http.post("http://127.0.0.1:4201/login",this.obj).toPromise().then((response)=>{
      this.loginInfo = response.json()
      if(this.loginInfo.responseCode==0){
        localStorage.setItem("phoneNumber", JSON.stringify(this.phoneNumber));
        localStorage.setItem("password", JSON.stringify(this.vertification));
        this.route.navigate(['/home'])
      }else{
        alert('密码错误！')
      }
    })
  }
}
