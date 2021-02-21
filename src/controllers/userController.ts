import { Response } from "express";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';


import Request from "../types/Request";
import User, { IUser } from "../models/User";




  const getUser = async (req: Request, res: Response) => {
    try {
      const user: IUser = await User.findById(req.userId).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users: Array<IUser>= await User.find()
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }



  
  export { getUser, getAllUsers }