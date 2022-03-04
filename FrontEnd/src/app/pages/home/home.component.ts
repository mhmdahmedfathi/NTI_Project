import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _auth: AuthService) {}
  imagePath = "assets/"
  err = ""
  products:Product[] = [
    {
      userId: "",
      title: "",
      description: "",
      image: "",
      index:0,
      price:0
    },
  ];
  count : number[] = []
  price:number[]=[]
  notSubmit:Boolean[]=[]
  Order:Order={
    userId:"",
    Products:[
        {
            title:"",
            quantity:0
        }
    ],
    totalPrice:0
  }
  msg=""
  ProductFilteredList:Array<object>=[]
  inc(index:number){
    this.count[index] += 1
    this.msg =""
    this.price[index] = this.count[index]*this.products[index].price
  }
  AddtoOrder(title:string,price:number,count:number,index:number){ 
    
    this.msg =""
    if(this.Order.Products[0].title  === ""){
      this.Order.Products[0] = {
        title:title,
        quantity:count
      }
      this.Order.totalPrice += price;
      this.notSubmit[index]=false
      console.log(this.Order);
    }else{
      this.Order.Products.push({
        title:title,
        quantity:count
      })
      this.Order.totalPrice += price;
      this.notSubmit[index]=false
      console.log(this.Order);  
    }
  }
  RemovefromOrder(title:string,price:number,count:number,index:number){ 
    
    this.msg =""
    if(this.Order.Products.length  == 1){
      this.Order.Products[0] = {
        title:"",
        quantity:0
      }
      this.Order.totalPrice -= price;
      this.notSubmit[index]=true
      console.log(this.Order);
    }else{
      this.ProductFilteredList = this.Order.Products.filter( data =>  data.title != title)
      this.Order.Products = this.ProductFilteredList as [{
        title:"",
        quantity:0
      }]
      this.Order.totalPrice -= price;
      this.notSubmit[index]=true
    }
  }
  SubmitOrder(){
    this.msg =""
    this._auth.SubmitOrder(this.Order).subscribe(data=>{
      
    },
    (e)=>{
      this.msg = e.error.message      
    },
    ()=>{
    }
    )
  }
  dec(index:number){
    if(this.count[index] - 1 <= -1 ){
      this.msg = "can't perform this operation as the count = 0 already"
      return
    }
    this.msg =""
    this.count[index] = this.count[index] - 1
    this.price[index] = this.count[index]*this.products[index].price
  }
  ngOnInit(): void {
    this._auth.me().subscribe((data) => this.Order.userId = data.data._id);
    this._auth.GetProducts().subscribe((data) => {
      this.products = data.data;
      for (let index = 0; index < data.data.length; index++) {
        this.products[index].index = index
        this.count[index]=0
        this.notSubmit[index]=true
        this.price[index] = 0
      }
    });
  }
}
