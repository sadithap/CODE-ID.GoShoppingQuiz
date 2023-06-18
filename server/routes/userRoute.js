import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.post('/signup',indexCtrl.userCtrl.createUser)
router.post('/signin',indexCtrl.userCtrl.userLogin)

export default router