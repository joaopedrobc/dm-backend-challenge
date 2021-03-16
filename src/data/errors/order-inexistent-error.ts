export class OrderInexistentError extends Error {
  constructor (id: string) {
    super(`Order could not be found: ${id}`)
    this.name = 'OrderInexistentError'
  }
}
