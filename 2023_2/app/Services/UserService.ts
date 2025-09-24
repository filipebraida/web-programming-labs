import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(email: string, password: string) {
    const user = await User.create({
      password,
      email,
    })

    return user
  }
}
