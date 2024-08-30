import express from 'express';
import queueRouter from '../route/dashboard_route/queue.route.js';
import dockRouter from '../route/dashboard_route/dock-visibility.route.js';
import authRouter from '../route/authenticate_route/user.route.js';
const Router = express.Router();

Router.use("/users", authRouter);
Router.use("/queue", queueRouter);
Router.use("/dock-visibility", dockRouter);

export default Router;