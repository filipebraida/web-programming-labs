import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const user = new User()
    user.fullName = 'Administrador'
    user.email = 'admin@repo.com'
    user.password = '123'

    await user.save()
  }
}
