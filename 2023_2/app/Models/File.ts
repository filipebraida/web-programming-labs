import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import path from 'path'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get stream() {
    return fs.createReadStream(path.join(Application.tmpPath('uploads'), this.fileName))
  }
}
