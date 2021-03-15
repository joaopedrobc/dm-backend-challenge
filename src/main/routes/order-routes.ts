import { Router } from 'express'
import { makeCreateOrderController } from '../factories/order'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/orders', adaptRoute(makeCreateOrderController()))
}
