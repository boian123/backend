import bcrypt from "bcrypt";
import { Response } from "express";
import {  body ,validationResult } from "express-validator";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import jwt from "jsonwebtoken";

import Payload from "../types/Payload";
import Request from "../types/Request";
import User, { IUser } from "../models/User";

const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user: IUser = await User.findOne({ email });

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "User already exists"
          }
        ]
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Build user object based on IUser
    const userFields = {
      email,
      password: hashed,
      
    };

    user = new User(userFields);

    await user.save();

    const payload: Payload = {
      userId: user.id
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}



const loginUser = async (req: Request, res: Response) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user: IUser = await User.findOne({ email });

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      const payload: Payload = {
        userId: user.id
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn:process.env.TOKEN_EXPIRES },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }



  export {loginUser  ,registerUser}