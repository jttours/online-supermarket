import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';

import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CartProducts } from 'src/app/models/CartProducts';

@Component({
  selector: 'shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {


  productToBuyId: any;
  productToBuyName: any;
  productToBuyPrice: any;
  productToBuyImage: any;
  productToBuyCategory: any;

  myCartForm!: FormGroup;
  submitted: boolean = false;
  cartProductDetails: Object | undefined;

  public resize: boolean = false;
  private productSubscription!: Subscription;
  product!: Product;
  products: Product[] = [];
  currentUser!: any;
  page: any;
  maxSize = 12;
  pageSecond: any;
  filteredProducts: any;
  data: any;
  cart: any;
  cartProducts: any;
  cProduct:any;
  itemPrice: any;

  goToOrder:boolean = false;
  

  buyThisProduct(data: any){
    console.log(data);
    this.productToBuyId=data._id;
    this.productToBuyName=data.name;
    this.productToBuyPrice=data.price;
    this.productToBuyImage=data.image;
    this.productToBuyCategory=data.category;
  }

  createForm() {
    this.myCartForm = this.formBuilder.group({
      cartCurrentUser_Id:[''],
      cartProduct_Id:[''],
      cartCurrentUserName:[''],
      cartProductQuantity: [''],
      cartProductUnitPrice: [''],
      cartProductImage: [''],
      cartProductName: [''],
    })
  }
  
  
  
  

  constructor(
    private router: Router,
    private productService: ProductService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
  ) { }
  

  ngOnInit(): void {
    this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log('shopping - ',products);
      });

      
      this.createForm();
      this.getCart();
  }
  resizePage(){
    this.resize = !this.resize;    
  }   

  shoppingSelectedCategory(newSelectedCategory : string) {
    console.log('new selected category',newSelectedCategory);

    this.filteredProducts = this.products.filter(function (item) {
      return item.category == newSelectedCategory;
    });  
    console.log('filteredValue',(this.filteredProducts));
  }

  addToCart(){
    this.submitted=true;
    this.myCartForm.value.cartProductUnitPrice = this.productToBuyPrice;
    this.myCartForm.value.cartProduct_Id = this.productToBuyId;
    this.myCartForm.value.cartProductImage = this.productToBuyImage;
    this.myCartForm.value.cartProductName = this.productToBuyName;
    this.myCartForm.value.cartCurrentUser_Id = this.authService.currentUser._id;
    this.myCartForm.value.cartCurrentUserName = this.authService.currentUser.firstName;
    console.log ('cart product', this.myCartForm.value);

    this.cartService.addToCart(
      this.myCartForm.value).subscribe((res: any) => {
        this.data = res;
        // alert("acount transaction added");
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);    
      })
    this.myCartForm.reset();

       
    });   
  }

  getCart(){
    this.cartService.getCart(this.authService.currentUser._id).subscribe(res=>{
      
      console.log("response - ",(res));
      this.cartProducts=res;
      console.log('cart',this.cartProducts);

      
      
    })
  }
  total(cartProducts: any) {
    var total = 0;
    cartProducts.forEach((element: { productPrice: number; productQuantity: number; }) => {
      total = total + (element.productPrice * element.productQuantity);
    });
    return total;
  }

  completeTheOrder(orderProducts: boolean){
    console.log('order products - ',orderProducts);
    this.goToOrder=orderProducts;
    
  }
  
}
