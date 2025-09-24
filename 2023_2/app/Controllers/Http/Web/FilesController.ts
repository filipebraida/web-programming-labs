import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import File from 'App/Models/File'

export default class FilesController {
  public async show({ params, response }: HttpContextContract) {
    const file = await File.findOrFail(params.id)

    return response.stream(file.stream)
  }
}
