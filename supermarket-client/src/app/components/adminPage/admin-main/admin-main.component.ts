import { AuthService } from './../../../services/auth.service';
import { SearchProductPipe } from './../../../pipes/search-product.pipe';
import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { NavigationEnd, Router } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/Product';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Categories } from '../../../models/Categories';




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
  filteredProducts: any;

  page: any;
  maxSize = 12;
  pageSecond: any;
  pagedList: Product[]= [];
  breakpoint: number = 8;
  length: number = 0;
  pageSize: number = 8;
  pageSizeOptions: number[] = [8, 12];
  pageEvent!: PageEvent;

  searchText = '';

  mySubscription: any;

  categories= [] = Categories;
  

  
  
  // on product selection from the grid of products, display product details in the update product form

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
    private productService: ProductService,
    public authService: AuthService) {   
    }

  

  ngOnInit(): void {this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
        // console.log('products',products);

        this.breakpoint = (window.innerWidth <= 800) ? 1 : 12;
        console.log('1------',this.breakpoint);
        this.pagedList = this.products.slice(0, 12);
        console.log('paged list - ',this.pagedList)
        this.length = this.products.length;
      });

      this.updateProductForm = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null),
        price: new FormControl(null),
        image: new FormControl(null),
        category: new FormControl(null),
      })

        
  }
  shoppingSelectedCategory(newSelectedCategory : string) {
    console.log('new selected category',newSelectedCategory);

    this.filteredProducts = this.products.filter(function (item) {
      return item.category == newSelectedCategory;
    });  
    console.log('filteredValue',(this.filteredProducts));
  }


  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }


  // select a category and filter all products with that category value

  selectedCategory = this.categories[0];
  onSelect(category: any): void {
    this.selectedCategory = category;
    console.log('the category is - ', category.name);
    console.log('products2 - ', this.products)

    this.filteredProducts = this.products.filter(function (item) {
      return item.category == category.name;
    });  
    console.log('filteredValue',(this.filteredProducts));
    this.pagedList = this.filteredProducts.slice(0, 12);
    this.length = this.filteredProducts.length;
  }

  // upload file on file select in the form

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
//update the product with the new details entered on the form

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

        
        // refresh page to show details of updated product
        
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);       
    });   
  }

  OnPageChange(event: PageEvent) {
    console.log('event',event);
    let startIndex = event.pageIndex * event.pageSize;
    console.log('startIndex',startIndex);
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.products.slice(startIndex, endIndex);
    
  }

  onResize(event: any) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 12;
    console.log('onResize - ',this.breakpoint);
  }
}
