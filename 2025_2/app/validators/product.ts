import vine from '@vinejs/vine'

/**
 * Validates the product's creation action
 */
export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).trim(),
    price: vine.number(),
    description: vine.string().minLength(3).trim(),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
    }),
  })
)
