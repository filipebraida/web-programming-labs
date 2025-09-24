import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

import UserService from 'App/Services/UserService'

export default class UsersController {
  public async create({ view }: HttpContextContract) {
    return view.render('users/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const email = request.input('email', undefined)
    const password = request.input('password', undefined)

    if (!email || !password) {
      response.status(400)
      return response
    }

    const userService = new UserService()
    const user = await userService.create(email, password)

    return response.redirect().toRoute('users.show', { id: user.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('users/show', { user: user })
  }

  public async update({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('users/update', { user: user })
  }

  public async patch({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const email = request.input('email', undefined)
    const password = request.input('password', undefined)

    user.email = email ? email : user.email
    user.password = password ? password : user.password

    await user.save()

    return response.redirect().toRoute('users.show', { id: user.id })
  }

  public async index({ view }: HttpContextContract) {
    const users = await User.all()

    return view.render('users/index', { users: users })
  }
}
