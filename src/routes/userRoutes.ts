import bcrypt from "bcrypt";
import { Router} from "express";


import auth from "../middleware/auth";

import { getAllUsers,getUser } from "../controllers/userController";


const router: Router = Router();


router.get('/users',auth,getAllUsers)
router.get('/user/:id',auth,getUser)



















export default router;


