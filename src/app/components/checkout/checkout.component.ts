import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ShopizerService } from 'src/app/services/shopizer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  checkoutFormGroup!:FormGroup;
  totalQuantity:number=0;
  totalPrice:number=0.00;
  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  constructor(private formBuilder:FormBuilder, private shopizerService:ShopizerService,private cartService:CartService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

      const startMonth:number = new Date().getMonth()+1;

      this.shopizerService.getCreditCardMonths(startMonth).subscribe(data =>{
         this.creditCardMonths=data;
      })

      this.shopizerService.getCreditCardYears().subscribe(data => {
        this.creditCardYears=data;
      })

      this.cartService.totalPrice.subscribe(data =>
        this.totalPrice = data);

      this.cartService.totalQuantity.subscribe(data =>
        this.totalQuantity = data);
  }

  onSubmit(){
  console.log('handling the submit button');
    console.log(this.checkoutFormGroup?.get('customer')?.value);
    console.log(this.checkoutFormGroup?.get('shippingAddress')?.value);
    console.log(this.checkoutFormGroup?.get('creditCard')?.value);
  }

  copyShippingAddressToBillingAddress(event: any){

      if(event.target.checked){
        this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      }
      else{
        this.checkoutFormGroup.controls.billingAddress.reset();
      }
  }

}
