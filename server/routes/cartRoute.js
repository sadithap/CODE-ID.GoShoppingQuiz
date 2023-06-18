import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.cartCtrl.findAll)
router.post('/add',indexCtrl.cartCtrl.addToCart)

export default router