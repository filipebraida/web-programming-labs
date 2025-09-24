import vine from '@vinejs/vine'

/**
 * Validates the auth's creation action
 */
export const createAuthValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().minLength(3)
  })
)
