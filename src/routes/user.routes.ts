import express from 'express'
import { createUserHandler, forgotPasswordHandler, getCurrentUserhandler, resetPasswordhandler, verifyUserHandler } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';

const router = express.Router();

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

router.post('/api/users', validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/users/verify/{id}/{verificationCode}':
   *  post:
   *     tags:
   *     - Verify User
   *     summary: Verify User by passing id and verification code.
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *      - name: verificationCode
   *        in: path
   *        description: The verification id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Successfully verified the user
   *         content:
   *          text/plain:
   *            schema:
   *              type: string
   *       404:
   *         description: Could not verify user
   *         content:
   *          text/plain:
   *            schema:
   *              type: string
   */

router.post('/api/users/verify/:id/:verificationCode', validateResource(verifyUserSchema),verifyUserHandler)

  /**
   * @openapi
   * '/api/users/forgotpassword':
   *  post:
   *     tags:
   *     - Forgot Password
   *     summary: The user will be sent an email containing the password reset code.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            $ref: '#/components/schemas/ForgotPasswordInput'
   *     responses:
   *       200:
   *         description: Sent the user an email containing the password reset code
   *         content:
   *          text/plain:
   *            schema:
   *              type: string
   *       404:
   *         description: User with this email does not exist.
   *         content:
   *          text/plain:
   *            schema:
   *              type: string
   */

router.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

/**
   * @openapi
   * '/api/users/resetpassword/{id}/{passwordResetCode}':
   *  post:
   *     tags:
   *     - Reset passoword
   *     summary: Reset password
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *      - name: passwordResetCode
   *        in: path
   *        description: The password Reset Code of the user
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/ResetPasswordInput'    
   *     responses:
   *       200:
   *         description: Successfully verified the user
   *         content:
   *          text/plain:
   *            schema:
   *              type: string
   *       400:
   *         description: Could not reset password
   *         content:
   *          text/plain:
   *            schema:
   *              type: string
   */

router.post('/api/users/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordhandler)

  /**
   * @openapi
   * '/api/users/me':
   *  get:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *     - User
   *     summary: Get user information using access token
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserResponse'
   *      403:
   *        description: Forbidden. User is not logged in
   */

router.get('/api/users/me', requireUser, getCurrentUserhandler);

export default router