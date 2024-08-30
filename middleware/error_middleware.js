import { ZodError } from "zod";
import ResponseError from "../error/response_error.js";

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
      details: err.data
    });
  } else if(err instanceof ZodError){
    console.log(err)
    return res.status(400).json({
      status: "error",
      message: "validation error",
      details: err.errors
    });
  }
  else{
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export default errorMiddleware;
