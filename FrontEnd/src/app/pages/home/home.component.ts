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
  products = [
    {
      userId: {},
      title: {},
      description: {},
      image: {},
    },
  ];
  image(ProductImage:string):void{
    this._auth.GetImage(ProductImage).subscribe((data)=>console.log(data))
  }
  ngOnInit(): void {
    this._auth.me().subscribe((data) => console.log(data));
    this._auth.GetProducts().subscribe((data) => {
      this.products = data.data;
      console.log(this.products[0].image)
    });
  }
}
