import * as dot from 'dotenv'
dot.config();

import express from 'express';
import config from 'config'
import connectToDb from './utils/connectToDb';
import log from './utils/logger';
import router from './routes';
import deserializeUser from './middleware/deserializeUser';
import swaggerDocs from './utils/swagger';

const app = express();
app.use(express.json());

app.use(deserializeUser);
app.use(router)

const port: number = config.get('port');

app.listen(port, ()=>{
  connectToDb();
  log.info(`App is running at http://localhost:${port}.`);

  swaggerDocs(app,port);
});
