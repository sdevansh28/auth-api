import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - password
 *        - passwordConfirmation
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        firstName:
 *          type: string
 *          default: Jane
 *        lastName:
 *          type: string
 *          default: Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
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
 */

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "Last name is required",
    }).min(6,'Password is too short - should be min of 6 characters.'),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email('not a valid email')
  
  }).refine(data=> data.password ===  data.passwordConfirmation, {
    message: "Password do not match",
    path: ['passwordConfirmation']
  })
})

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  })
})

/**
 * @openapi
 * components:
 *  schemas:
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 */

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email('not a valid email'),
  })
})

/**
 * @openapi
 * components:
 *  schemas:
 *    ResetPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 */

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body:object({
    password: string({
      required_error: "Last name is required",
    }).min(6,'Password is too short - should be min of 6 characters.'),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine(data=> data.password ===  data.passwordConfirmation, {
    message: "Password do not match",
    path: ['passwordConfirmation']
  }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;