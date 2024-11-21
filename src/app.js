import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routeIA from './controllers/controller_IAChatGPT';

dotenv.config();

app.use(cors());
app.use(express.json());

const app = express();
const port = 3001;

app.use('analysis', routeIA);

const startServer = () => {
    try{
        app.listen(port, () => console.log(`server on port ${port}`))
    }catch(error){
        console.error(error);
        process.exit(1)
    }
};

startServer();

