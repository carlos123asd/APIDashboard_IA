import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routeIA from './controllers/controller_IAChatGPT.js';

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    return res.send("INICIO");
});
app.use('/analysis', routeIA);

const startServer = () => {
    try{
        app.listen(port, () => console.log(`server listen on http://localhost:${port}`))
    }catch(error){
        console.error(error);
        process.exit(1)
    }
};

startServer();

