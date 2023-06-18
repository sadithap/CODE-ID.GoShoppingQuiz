import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.customerCtrl.findOne)
router.get('/order',indexCtrl.customerCtrl.yourOrder)

export default router