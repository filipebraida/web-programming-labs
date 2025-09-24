import vine from '@vinejs/vine'

/**
 * Validates the product's creation action
 */
export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    price: vine.number().min(0),
    description: vine.string().trim(),
    categoryId: vine.number(),
  })
)

