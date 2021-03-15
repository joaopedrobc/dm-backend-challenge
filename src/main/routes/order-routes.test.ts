import request from 'supertest'
import app from '../config/app'

describe('Order Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/orders')
      .send({
        products: [
          {
            name: 'Kiwi',
            quantity: 1
          }
        ]
      })
      .expect(200)
  })
})
