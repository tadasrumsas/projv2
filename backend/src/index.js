import express from 'express';
import cors from 'cors';
import clientRoutes from "./routes/clientRoutes.js";
import cookieParser from 'cookie-parser';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);

app.use(cookieParser());

app.listen(port, () => {
    console.log("listening on port 3002");
});
