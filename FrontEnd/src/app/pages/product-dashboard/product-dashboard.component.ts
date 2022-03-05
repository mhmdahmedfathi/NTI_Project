import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/services/auth.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) { }
  GoToEdit(productId:any){
    this._auth.productid = productId
    this._router.navigateByUrl("/editproduct")
  }
  Delete(productId:any){
    this._auth.deleteProduct(productId).subscribe((data)=>location.reload())
  }
  AddProduct(){
    this._router.navigateByUrl("/addproduct")
  }
  Products:Product[]=[]
  ngOnInit(): void {
    this._auth.getOwnProducts().subscribe((data)=>this.Products = data.data)

  }

}
