import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

import { createAuthValidator } from '#validators/auth'

export default class AuthController {
  public async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createAuthValidator)

    const user = await User.verifyCredentials(payload.email, payload.password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('home.show')
  }

  public create({ view }: HttpContext) {
    return view.render('pages/login')
  }
}
