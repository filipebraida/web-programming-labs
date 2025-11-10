/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const ProductsController = () => import('#controllers/products_controller')
const ImagesController = () => import('#controllers/images_controller')
const AuthController = () => import('#controllers/auth_controller')

router
  .get('/', ({ view }) => {
    return view.render('pages/home')
  })
  .as('home.show')

router.get('/login', [AuthController, 'create']).as('auth.create')
router.post('/login', [AuthController, 'store']).as('auth.store')

router.resource('/products', ProductsController).use('*', middleware.auth()).as('products')

router.get('/images/:name', [ImagesController, 'show']).as('images.show')
