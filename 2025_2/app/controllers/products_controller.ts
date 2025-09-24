import type { HttpContext } from '@adonisjs/core/http'

import Product from '#models/product'

import { createProductValidator } from '#validators/product'

export default class ProductsController {
  public async index({ view }: HttpContext) {
    const products = await Product.all()

    return view.render('pages/products/index', { products })
  }
  public async create({ view }: HttpContext) {
    return view.render('pages/products/create')
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)

    await Product.create(payload)

    return response.redirect().toRoute('products.index')
  }
}
