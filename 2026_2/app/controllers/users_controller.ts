import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ view }: HttpContext) {
    const users = await User.all()

    return view.render('pages/users/index', { users })
  }

  async show({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)

    return view.render('pages/users/show', { user })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    })

    return response.redirect().toRoute('users.show', { id: user.id })
  }
}
