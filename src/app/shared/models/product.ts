export class ProductModel {
  constructor(
    public id?: string,
    public title?: string,
    public price?: number,
    public category?: string,
    public imageurl?: string,
    public quantity?: number
  ) {}
}
