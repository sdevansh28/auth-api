import {object, string, TypeOf} from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *    UserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        iat:
 *          type: number
 *        exp:
 *          type: number
 */

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'email is required'
    }).email(),
    password: string({
      required_error: 'password is required'
    }).min(6,'invalid email or password'),
  })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];