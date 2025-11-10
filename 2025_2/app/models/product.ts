import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Image from '#models/image'
import Feedback from '#models/feedback'
import User from '#models/user'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare description: string

  @hasMany(() => Image)
  declare images: HasMany<typeof Image>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  public async liked(user: User) {
    const feedback = await Feedback.query()
      .where('productId', this.id)
      .andWhere('userId', user.id)
      .first()

    return feedback ? Boolean(feedback.liked) : null
  }
}
