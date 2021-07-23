import { Products } from "./products";

export class CartItem {
    id?:number;
    name:String|undefined;
    imageUrl:String|undefined;
    unitPrice:number|undefined;
    quantity!:number;

    constructor(product:Products){
        this.id=product.id;
        this.name=product.name;
        this.imageUrl=product.imageUrl;
        this.unitPrice=product.unitPrice;
        this.quantity=1;
    }
}
