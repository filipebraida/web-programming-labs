import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Video from 'App/Models/Video'

export default class VideosController {
  public async index({ auth, request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const videos = await Video.query().preload('usersLiked').paginate(page, limit)

    var idVideosLiked = []

    for await (var video of videos) {
      video.liked = false

      for await (var user of video.usersLiked) {
        if(user.id === auth.user.id) {
          //idVideosLiked.push(video.id)
          video.liked = true
        }
      }
    }

    console.log(videos[0].liked)

    return view.render('videos/index', { videos: videos })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('videos.create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'description', 'youtubeKey'])

    const video = await Video.create(data)

    return response.redirect().toRoute('videos.show', { id: video.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const video = await Video.find(params.id)

    return view.render('videos/show', { video: video })
  }

  public async like({ auth, params }: HttpContextContract) {
    console.log('estou no like')
    const user = await User.findOrFail(auth.user.id)
    const video = await Video.findOrFail(params.id)

    await user?.load('videosLiked')

    var userLikedVideo = false

    for await (var videoLikedUser of user.videosLiked) {
      if (videoLikedUser.id === video.id) {
        userLikedVideo = true
      }
    }

    if(!userLikedVideo) {
      user?.related('videosLiked').attach([video!.id])
    }

    return { id: params.id, like: 'true' }
  }

  public async dislike({ auth, params }: HttpContextContract) {
    console.log('estou no dislike')
    const user = await User.find(auth.user.id)
    const video = await Video.find(params.id)

    user?.related('videosLiked').detach([video!.id])

    return { id: params.id, like: 'false' }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
