export class ProductsNoStockError extends Error {
  constructor () {
    super('Products out of stock')
    this.name = 'ProductNoStock'
  }
}
