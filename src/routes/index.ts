import express from 'express'
import user from './user.routes'
import auth from './auth.routes'

const router = express.Router();

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(user)

router.use(auth)

export default router