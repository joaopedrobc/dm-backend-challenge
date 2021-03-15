import { Router } from 'express'
import { makeCreateOrderController, makeFindOrderController } from '../factories/order'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/orders', adaptRoute(makeCreateOrderController()))
  router.get('/orders/:orderId', adaptRoute(makeFindOrderController()))
  router.get('/orders', adaptRoute(makeFindOrderController()))
}
