import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/providers/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() Productid: string = "";
  msg: string = '';
  apiFlag: boolean = false;
 
  constructor(private _auth: AuthService) { }
  EditProductForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),

    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),

    price: new FormControl(0, [Validators.required]),
  });
  
  get title(){return this.EditProductForm.get('title')}
  get description(){return this.EditProductForm.get('description')}
  get price(){return this.EditProductForm.get('price')}

  ngOnInit(): void {
    this._auth.SingleProduct(this.Productid).subscribe((data)=>{
      this.EditProductForm.patchValue({
        title: data.data.title,
        description:data.data.description,
        price:data.data.price
      });
    })
  }
  handleEditProduct() {
    this._auth.editProduct(this.EditProductForm.value,this.Productid).subscribe((data)=>{
      this.msg = data.message
      this.apiFlag = true
    })
  }
}
