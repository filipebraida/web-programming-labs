import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserVideoLike extends BaseSchema {
  protected tableName = 'user_video_like'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('video_id').unsigned().references('videos.id')
      table.unique(['user_id', 'video_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
