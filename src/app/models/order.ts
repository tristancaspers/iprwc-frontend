import {ShoppingCartModel} from "./shopping-cart";

export class OrderModel {
  datePlaced: number;
  items: any[];

  // constructor(public userId: string, public shipping: any, cart: ShoppingCartModel) {
  //   this.datePlaced = new Date().getTime();
  //
  //   this.items = cart.items.map(item => {
  //     return {
  //       product: {
  //         title: item.title,
  //         imageUrl: item.imageUrl,
  //         price: item.price
  //       },
  //       quantity: item.quantity,
  //       totalPrice: item.totalPrice
  //     };
  //   });
  // }
}
