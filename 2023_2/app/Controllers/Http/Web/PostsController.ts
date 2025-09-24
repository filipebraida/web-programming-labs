import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Post from 'App/Models/Post'

import PostService from 'App/Services/PostService'

import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)

    //TODO: Pegar o usuario logado
    const user = await User.findOrFail(1)

    const postService = new PostService()
    const post = await postService.create(user, payload)

    return response.redirect().toRoute('posts.show', { id: post.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.load('user')

    const user = await User.findOrFail(1)

    return view.render('posts/show', { user: user, post: post })
  }

  public async update({}: HttpContextContract) {}

  public async patch({}: HttpContextContract) {}

  public async index({ view }: HttpContextContract) {
    return view.render('posts/index')
  }

  public async like({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const user = await User.findOrFail(1)
    const service = new PostService()
    const liked = await service.like(user, post)

    return { id: post.id, liked: liked }
  }
}
