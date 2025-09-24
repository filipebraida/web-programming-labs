import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAuthValidator from 'App/Validators/CreateAuthValidator'

export default class AuthController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/create')
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateAuthValidator)

    try {
      await auth.use('web').attempt(payload.email, payload.password)
      return response.redirect().toRoute('home.show')
    } catch {
      session.flashOnly(['email'])
      session.flash({ errors: { login: 'Não encontramos nenhuma conta com essas credenciais.' } })

      return response.redirect().toRoute('auth.create')
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    return response.redirect().toRoute('auth.create')
  }
}
