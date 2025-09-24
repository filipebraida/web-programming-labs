import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
  }

  public async create({ view }: HttpContextContract) {
    return view.render('users/create')
  }

  public async store({ request, view }: HttpContextContract) {
    const data = await request.validate(UserCreateValidator)

    console.log('oi')

    const user = await User.create({ email: data.email, password: data.password })

    return view.render('users.create')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
