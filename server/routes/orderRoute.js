import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.post('/create',indexCtrl.orderCtrl.createOrder)
router.post('/close',indexCtrl.orderCtrl.closeOrder)
router.post('/cancel',indexCtrl.orderCtrl.cancelOrder)

export default router