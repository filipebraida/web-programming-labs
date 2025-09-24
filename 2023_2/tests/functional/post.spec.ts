import Route from '@ioc:Adonis/Core/Route'
import { test } from '@japa/runner'

test.group('store post', () => {
  test('create a post', async ({ assert, client }) => {
    const post = {
      title: 'Titulo',
      content: 'Conteudo',
      authorId: 1,
    }

    const url = Route.makeUrl('posts.store')
    const response = await client.post(url).form(post)

    const data = response.body()

    assert.equal(data.title, post.title)
    assert.equal(data.content, post.content)
    assert.equal(data.authorId, post.authorId)
  })

  test('create a post without title', async ({ client }) => {
    const post = {
      content: 'Conteudo',
      authorId: 1,
    }

    const url = Route.makeUrl('posts.store')
    const response = await client.post(url).form(post)

    response.assertStatus(400)
  })

  test('create a post without content', async ({ client }) => {
    const post = {
      title: 'Conteudo',
      authorId: 1,
    }

    const url = Route.makeUrl('posts.store')
    const response = await client.post(url).form(post)

    response.assertStatus(400)
  })

  test('create a post without author', async ({ client }) => {
    const post = {
      content: 'Conteudo',
      title: 'oi',
    }

    const url = Route.makeUrl('posts.store')
    const response = await client.post(url).form(post)

    response.assertStatus(400)
  })
})

test.group('get post', () => {
  test('get a post', async ({ assert, client }) => {
    const post = {
      title: 'Titulo',
      content: 'Conteudo',
      authorId: 1,
    }

    const urlCreate = Route.makeUrl('posts.store')
    const responseCreate = await client.post(urlCreate).form(post)

    const data = responseCreate.body()

    const response = await client.get(`/posts/${data.id}`)

    const returnPost = response.body()

    assert.equal(returnPost.title, post.title)
    assert.equal(returnPost.content, post.content)
    assert.equal(returnPost.authorId, post.authorId)
  })
})
