import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'

import Product from '#models/product'

import { createProductValidator } from '#validators/product'
import app from '@adonisjs/core/services/app'
import Image from '#models/image'

export default class ProductsController {
  public async index({ view }: HttpContext) {
    const products = await Product.all()

    return view.render('pages/products/index', { products })
  }

  public async show({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.load('images')

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

    const product = await Product.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
    })

    const image = new Image()
    image.name = `${cuid()}.${payload.image.extname}`
    image.productId = product.id

    await payload.image.move(app.makePath('tmp/uploads'), {
      name: image.name,
    })

    await image.save()

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
