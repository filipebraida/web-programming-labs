/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProductsController = () => import('#controllers/products_controller')
const ImagesController = () => import('#controllers/images_controller')

router.get('/', ({ view }) => {
  return view.render('pages/home')
})

router.resource('/products', ProductsController).as('products')

router.get('/images/:name', [ImagesController, 'show']).as('images.show')
