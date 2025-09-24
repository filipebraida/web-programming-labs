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

Route.get('/', async ({ view }) => {
  return view.render('index')
}).as('index')

Route.get('/courses/:id', 'CoursesController.show')

// Rotas dos Videos
Route.get('/videos/create', 'VideosController.create').as('videos.create')
Route.get('/videos/:id/like', 'VideosController.like').middleware('auth:web')
Route.get('/videos/:id/dislike', 'VideosController.dislike').middleware('auth:web')

Route.get('/videos/:id', 'VideosController.show')
  .where('id', /^[0-9]$/)
  .as('videos.show')
Route.get('/videos', 'VideosController.index').middleware('auth:web').as('videos.index')
Route.post('/videos', 'VideosController.store').middleware('auth:web').as('videos.store')


Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.destroy').as('sessions.destroy')

Route.get('/users/create', 'UsersController.create').as('users.create')
Route.post('/users/', 'UsersController.store').as('users.store')
