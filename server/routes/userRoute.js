import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.post('/add',indexCtrl.userCtrl.createUser)
router.get('/',indexCtrl.userCtrl.findAll)

export default router