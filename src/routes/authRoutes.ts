
import { Router } from "express";
import { body } from "express-validator/check";


import { loginUser, registerUser } from "../controllers/authController";

 



const router: Router = Router();


router.post(
  "/register",
  [ 
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 })
  ],
  registerUser
  
);


router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists()
  ],
  loginUser
);

export default router;
