import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeFindProductController } from '../factories/product'

export default (router: Router): void => {
  router.get('/products/:name', adaptRoute(makeFindProductController()))
}
