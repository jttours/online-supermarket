import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { NavigationEnd, Router } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/Product';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  updateProductId: any;
  updateProductName: any;
  updateProductPrice: any;
  updateProductImage: any;
  updateProductCategory: any;
  products: Product[] = [];
  private productSubscription!: Subscription;
  updateProductForm!: FormGroup;
  imageData!: any;
  submitted = false;
  product!: Product;

  mySubscription: any;

  categories = [
    {  name: "Milk & Cheese" },
    {  name: "Fruits & Vegetables" },
    {  name: "Cleaning Materials" },
    {  name: "Drinks" },
    {  name: "Meat and Chicken" },
  ];
  
  

  getThisProduct(data: any){
    console.log(data);
    this.updateProductId=data._id;
    this.updateProductName=data.name;
    this.updateProductPrice=data.price;
    this.updateProductImage=data.image;
    this.updateProductCategory=data.category;
  }

  constructor(
    private router: Router,
    private productService: ProductService) { 
      
    }

  

  ngOnInit(): void {this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(products);
      });

      this.updateProductForm = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null),
        price: new FormControl(null),
        image: new FormControl(null),
        category: new FormControl(null),
      })
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  onFileSelect(event: any){
    const fileElement = (event.target);
    const file = fileElement.files[0];
    console.log(file);
    this.updateProductForm.patchValue({ image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    
  }

  updateProduct(){
      this.submitted = true;
      
      console.log('update product', this.updateProductForm.value);
      this.productService.updateProduct(
        this.updateProductForm.value.id,
        this.updateProductForm.value.name, 
        this.updateProductForm.value.image,
        this.updateProductForm.value.price,
        this.updateProductForm.value.category);
        this.updateProductForm.reset();
        this.imageData = null;

        

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });

        


        
    }

}
