import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error_middleware.js';
import mainRouter from './route/main.route.js'


dotenv.config()

const app = express();


const port = process.env.PORT 

app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json());
app.use("/api/v1/", mainRouter)

app.use(errorMiddleware);

app.listen(port, ()=>{
    console.log("running on port " + port)
});