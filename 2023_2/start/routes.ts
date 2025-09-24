/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async ({ view }: HttpContextContract) => {
  return view.render('home/show')
}).as('home.show')

// Route.group(() => {
//   Route.group(() => {
//     Route.get('/', 'PostsController.index')
//     Route.get('/id', 'PostsController.show')
//     Route.delete('/:id', 'PostsController.destroy')
//     Route.patch('/:id', 'PostsController.update')
//     Route.post('/', 'PostsController.store').as('posts.store')
//   }).prefix('/posts')

//   Route.group(() => {
//     Route.get('/', 'UsersController.index')
//     Route.get('/:id', 'UsersController.show')
//     Route.delete('/:id', 'UsersController.destroy')
//     Route.patch('/:id', 'UsersController.update')
//     Route.post('/', 'UsersController.store')
//   }).prefix('/users')
// })
//   .prefix('/api')
//   .namespace('App/Controllers/Http/Api')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index').as('index')
    Route.get('/new', 'UsersController.create').as('create')
    Route.post('/', 'UsersController.store').as('store')
    Route.get('/:id/update', 'UsersController.update').as('update')
    Route.patch('/:id', 'UsersController.patch').as('patch')
    Route.get('/:id', 'UsersController.show').as('show')
  })
    .prefix('/users')
    .as('users')

  Route.group(() => {
    Route.group(() => {
      Route.get('/like/:id', 'PostsController.like').as('like')
      Route.get('/new', 'PostsController.create').as('create')
      Route.post('/', 'PostsController.store').as('store')
      Route.patch('/:id', 'PostsController.patch').as('patch')
    }).middleware('auth')

    Route.get('/', 'PostsController.index').as('index')
    Route.get('/:id/update', 'PostsController.update').as('update')
    Route.get('/:id', 'PostsController.show').as('show')
  })
    .prefix('/posts')
    .as('posts')

  Route.get('/file/:id', 'FilesController.show').as('files.show')

  Route.group(() => {
    Route.get('/login', 'AuthController.create').as('create')
    Route.post('/login', 'AuthController.store').as('store')
    Route.delete('/logout', 'AuthController.destroy').as('destroy')
  })
    .as('auth')
}).namespace('App/Controllers/Http/Web')
