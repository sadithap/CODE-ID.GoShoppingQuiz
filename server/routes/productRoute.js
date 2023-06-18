import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.productCtrl.findAll)
router.get('/category',indexCtrl.productCtrl.findByCategory)
router.post('/add',indexCtrl.productCtrl.create)

export default router