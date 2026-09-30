import type { HttpContext } from '@adonisjs/core/http'

const users: { id: number; name: string; email: string }[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
]

export default class UsersController {
  async index({ view }: HttpContext) {
    return view.render('pages/users/index', { users })
  }

  async show({ params, view }: HttpContext) {
    const user = users.find((el) => el.id === Number.parseInt(params.id))

    if (!user) {
      return view.render('errors/not-found')
    }

    return view.render('pages/users/show', { user })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response }: HttpContext) {
    const { name, email } = request.only(['name', 'email'])
    const newUser = { id: users.length + 1, name, email }
    users.push(newUser)
    return response.redirect().toRoute('users.index')
  }
}
