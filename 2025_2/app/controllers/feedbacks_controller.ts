import type { HttpContext } from '@adonisjs/core/http'

import Product from '#models/product'
import Feedback from '#models/feedback'

export default class FeedbacksController {
  public async like({ auth, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const feedback = await Feedback.query()
      .where('productId', product.id)
      .andWhere('userId', auth.user!.id)
      .first()

    if (!feedback) {
      await Feedback.create({
        productId: product.id,
        userId: auth.user!.id,
        liked: true,
      })

      return {
        message: 'Product liked successfully',
        data: {
          productId: product.id,
          userId: auth.user!.id,
          liked: true,
        },
      }
    }

    if (feedback.liked) {
      await feedback.delete()

      return {
        message: 'Like removed successfully',
        data: {
          productId: product.id,
          userId: auth.user!.id,
        },
      }
    }

    feedback.liked = true
    await feedback.save()

    return {
      message: 'Product liked successfully',
      data: {
        productId: product.id,
        userId: auth.user!.id,
        liked: true,
      },
    }
  }

  public async dislike({ auth, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const feedback = await Feedback.query()
      .where('productId', product.id)
      .andWhere('userId', auth.user!.id)
      .first()

    if (!feedback) {
      await Feedback.create({
        productId: product.id,
        userId: auth.user!.id,
        liked: false,
      })

      return {
        message: 'Product disliked successfully',
        data: {
          productId: product.id,
          userId: auth.user!.id,
          liked: false,
        },
      }
    }

    if (!feedback.liked) {
      await feedback.delete()

      return {
        message: 'Dislike removed successfully',
        data: {
          productId: product.id,
          userId: auth.user!.id,
        },
      }
    }

    feedback.liked = false
    await feedback.save()

    return {
      message: 'Product disliked successfully',
      data: {
        productId: product.id,
        userId: auth.user!.id,
        liked: false,
      },
    }
  }
}
