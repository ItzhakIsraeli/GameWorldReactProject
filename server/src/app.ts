// @ts-ignore
import express, {Request, Response} from 'express';
import {checkout, getAllProducts} from './db/store.dal';
import bodyParser from 'body-parser';
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// const init = async () => {
//     app.listen(port, () => console.log(`server running in port ${port}`));
//     await connect();
// }

app.get('/products', async (req: Request, res:Response) => {
    res.send(await getAllProducts());
});

app.post('/checkout', async (req: Request, res:Response) => {
    const order = await checkout(req.body);
    console.log(req.body)
    res.send(order);
});

// init();


