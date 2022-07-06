import config from 'config'
import mongoose from 'mongoose'
import log from './logger';

const connectToDb = async () => {

  const dbUri = config.get<string>('dbUri');

  try{
    await mongoose.connect(dbUri)
    log.info('Connected to DB');
  } catch(e){
    process.exit(1);
  }
}

export default connectToDb