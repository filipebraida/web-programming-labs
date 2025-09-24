import User from "#models/user"
import { createAuthValidator } from "#validators/auth"
import { HttpContext } from "@adonisjs/core/http"

export default class AuthController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/create')
  }

  async store({ auth, request, response, session }: HttpContext) {
    try{
      const payload = await request.validateUsing(createAuthValidator)

      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)
    } catch(exception) {
      session.flashOnly(['email'])
      session.flash({ errors: { login: 'Não encontramos nenhuma conta com essas credenciais.' } })
      return response.redirect().back()
    }

    return response.redirect().toRoute('home.show')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toRoute('home.show')
  }
}
