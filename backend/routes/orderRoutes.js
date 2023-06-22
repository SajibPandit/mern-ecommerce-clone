import express from 'express'
import {addOrderItems,getOrderById,getOrders,updateOrderToPaid,getMyOrders} from '../controllers/orderController.js'
import {protect} from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect,addOrderItems).get(protect,getOrders)
router.route('/myorders',getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').get(protect,updateOrderToPaid)



export default router