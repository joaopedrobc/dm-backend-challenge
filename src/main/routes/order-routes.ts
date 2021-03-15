import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orders', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
