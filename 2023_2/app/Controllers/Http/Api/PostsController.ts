import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.all()
    return posts
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return null
  }

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const title = request.input('title', undefined)
    const content = request.input('content', undefined)

    post.title = title ? title : post.title
    post.content = content ? content : post.content

    await post.save()

    return post
  }

  public async store({ request, response }: HttpContextContract) {
    const title = request.input('title', undefined)
    const content = request.input('content', undefined)
    const userId = request.input('userId', undefined)

    if (!title || !content || !userId) {
      response.status(400)
      return response
    }

    const post = await Post.create({
      content,
      title,
      userId,
    })

    return post
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return post
  }
}
