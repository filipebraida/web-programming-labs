/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', ({ view }: HttpContext) => {
  return view.render('home')
})

router.resource('/users', controllers.Users).as('users').only(['index', 'show', 'create', 'store'])
