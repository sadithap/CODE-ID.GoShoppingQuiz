import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.post('/add',indexCtrl.orderCtrl.addOrder)

export default router