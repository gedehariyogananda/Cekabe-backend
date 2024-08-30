import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRouter from './route/user.route.js'
import errorMiddleware from './middleware/error_middleware.js';
import customerRouter from './route/customer.route.js'
import dashboardRouter from './route/dashboard.route.js'


dotenv.config()

const app = express();

const port = process.env.PORT 

app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json())
app.use("/api/v1/users", userRouter)
app.use("/api/v1/customers", customerRouter)
app.use("/api/v1/", dashboardRouter)

app.use(errorMiddleware);

app.listen(port, ()=>{
    console.log("running on port " + port)
});