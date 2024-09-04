import express from 'express';
import queueRouter from '../route/dashboard_route/queue.route.js';
import dockRouter from '../route/dashboard_route/dock-visibility.route.js';
import authRouter from '../route/authenticate_route/user.route.js';
import outstandingRouter from '../route/dashboard_route/outstanding.route.js';
import bookingRouter from '../route/booking_route/booking.route.js';
import historyRouter from '../route/dashboard_route/history.route.js';
const Router = express.Router();

// authenticate modul route
Router.use("/users", authRouter);

// dashboard modul route
Router.use("/queue", queueRouter);
Router.use("/dock-visibility", dockRouter);
Router.use("/outstanding", outstandingRouter);
Router.use("/history", historyRouter);

// booking modul route
Router.use("/booking", bookingRouter);

export default Router;