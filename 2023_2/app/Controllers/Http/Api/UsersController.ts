import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

import UserService from 'App/Services/UserService'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return null
  }

  public async update({ request, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const email = request.input('email', undefined)
    const password = request.input('password', undefined)

    user.email = email ? email : user.email
    user.password = password ? password : user.password

    await user.save()

    return user
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

    return user
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }
}
