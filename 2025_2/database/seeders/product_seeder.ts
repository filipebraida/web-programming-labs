import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch(
      'https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/refs/heads/master/cards/en/base1.json'
    )
    const data = await response.json()
    console.log(data)
  }
}
