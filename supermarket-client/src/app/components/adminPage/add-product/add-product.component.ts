import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';


import { Product } from '../../../models/Product'

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  product!: Product;
  imageData!: any;
  submitted = false;
  

  categories = [
    {  name: "Milk & Cheese" },
    {  name: "Fruits & Vegetables" },
    {  name: "Cleaning Materials" },
    {  name: "Drinks" },
    {  name: "Meat and Chicken" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(null),
      price: new FormControl(null),
      image: new FormControl(null),
      category: new FormControl(null),
    })
  }

  onFileSelect(event: any){
      const fileElement = (event.target);
      const file = fileElement.files[0];
      console.log(file);
      this.addProductForm.patchValue({ image: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    
  
  }

  addProduct() {
    this.submitted = true;
    console.log('add product', this.addProductForm.value);
    this.productService.addProduct(
      this.addProductForm.value.name, 
      this.addProductForm.value.image,
      this.addProductForm.value.price,
      this.addProductForm.value.category);
    this.addProductForm.reset();
    this.imageData = null;
  }
}




