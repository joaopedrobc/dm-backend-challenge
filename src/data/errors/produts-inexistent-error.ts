export class ProductInexistentError extends Error {
  constructor (productName: string) {
    super(`Product could not be found: ${productName}`)
    this.name = 'ProductInexistentError'
  }
}
