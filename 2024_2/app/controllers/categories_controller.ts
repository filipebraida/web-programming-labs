import { HttpContext } from "@adonisjs/core/http"

import Category from "#models/category"

export default class CategoryController {
  async show({ view, params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.load('products')

    return view.render('pages/categories/show', { category })
  }
}
