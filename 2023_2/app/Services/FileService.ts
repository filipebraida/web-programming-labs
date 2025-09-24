import Application from '@ioc:Adonis/Core/Application'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

import File from 'App/Models/File'

export default class FileService {
  constructor() {}

  public async create(data: MultipartFileContract) {
    await data.move(Application.tmpPath('uploads'))

    const file = new File()

    file.fileName = data.fileName ? data.fileName : ''

    await file.save()

    return file
  }
}
