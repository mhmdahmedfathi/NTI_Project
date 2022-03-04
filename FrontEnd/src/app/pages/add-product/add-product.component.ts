import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  msg: string = '';
  apiFlag: boolean = false;
  AddProductForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),

    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),

    price: new FormControl(0, [Validators.required]),
    
    file: new FormControl('', [Validators.required]),
    path: new FormControl('', [Validators.required]),
  });
  constructor(private _auth: AuthService, private _router: Router) {}
  get title(){return this.AddProductForm.get('title')}
  get description(){return this.AddProductForm.get('description')}
  get price(){return this.AddProductForm.get('price')}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      const formData = new FormData()
      formData.append("img",file)
      this._auth.AddImage(formData).subscribe((data)=>{
        this.AddProductForm.patchValue({
          path: data.data,
        });
        this.msg = data.message
        this.apiFlag = true
      })
    }
  }
  handleAddProduct() {
    this._auth.AddProduct(this.AddProductForm.value).subscribe((data)=>{
      this.msg = data.message
      this.apiFlag = true
    })
  }
}
