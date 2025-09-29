import type { HttpContext } from '@adonisjs/core/http'

import Product from '#models/product'

import { createProductValidator } from '#validators/product'

export default class ProductsController {
  public async index({ view }: HttpContext) {
    const products = await Product.all()

    return view.render('pages/products/index', { products })
  }

  public async show({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    return view.render('pages/products/show', { product })
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/products/create')
  }

  public async edit({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    return view.render('pages/products/create', { product })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)

    const product = await Product.create(payload)

    return response.redirect().toRoute('products.show', { id: product.id })
  }

  public async update({ params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const payload = await request.validateUsing(createProductValidator)

    product.merge(payload)
    await product.save()

    return response.redirect().toRoute('products.show', { id: product.id })
  }

  public async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    await product.delete()

    return response.redirect().toRoute('products.index')
  }
}
