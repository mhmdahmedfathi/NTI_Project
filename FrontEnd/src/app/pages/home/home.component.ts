import { Component, OnInit } from '@angular/core';
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
  products = [
    {
      userId: {},
      title: {},
      description: {},
      image: {},
      index:0,
      price:0
    },
  ];
  count : number[] = []
  price:number[]=[]
  inc(index:number){
    this.count[index] += 1
    this.price[index] = this.count[index]*this.products[index].price
  }
  dec(index:number){
    if(this.count[index] - 1 <= -1 ){
      this.err = "can't perform this operation"
      return
    }
    this.count[index] = this.count[index] - 1
    this.price[index] = this.count[index]*this.products[index].price
  }
  ngOnInit(): void {
    this._auth.me().subscribe((data) => console.log(data));
    this._auth.GetProducts().subscribe((data) => {
      this.products = data.data;
      for (let index = 0; index < data.data.length; index++) {
        this.products[index].index = index
        this.count[index]=0
      }
    });
  }
}
