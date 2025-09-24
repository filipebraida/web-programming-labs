import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public youtubeKey: string

  @manyToMany(() => User, {
    pivotTable: 'user_video_like',
  })
  public usersLiked: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get thumbnail() {
    return `https://img.youtube.com/vi/${this.youtubeKey}/0.jpg`
  }

  @computed()
  public get descriptionLimited() {
    if (this.description.length > 80) {
      return this.description.substring(0, 80) + '...'
    }

    return this.description
  }
}
