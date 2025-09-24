import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import File from 'App/Models/File'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public title: string

  @column()
  public userId: number

  @column()
  public coverId: number

  @belongsTo(() => File)
  public cover: BelongsTo<typeof File>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'user_post',
  })
  public likedUsers: ManyToMany<typeof User>

  public async liked(user: User) {
    const post: Post = this
    await post.load('likedUsers')

    for await (const likedUser of post.likedUsers) {
      if (user.id === likedUser.id) {
        return true
      }
    }

    return false
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
