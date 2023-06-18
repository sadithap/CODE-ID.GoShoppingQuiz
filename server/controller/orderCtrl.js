import { literal, fn } from "../../schema/init-models";

const addOrder = async (req, res) => {
    try {
        // const username
        // const product
        // const qty
        const user = await req.context.models.users.findOne({
            where: {username: req.body.username}
        });
        const product = await req.context.models.product.findOne({
            where : {name:req.body.product}
        });
        // console.log(product.product_id);
        // console.log(`harga satuan = ${product.price}\ntotal = ${product.price*req.body.qty}`)
        if((product.qty-req.body.qty)<0){
            return res.status(404).json({ message: 'Item tidak cukup' });
        }
        const price=product.price*req.body.qty;
        const order = await req.context.models.orders.create({
            user_id: user.id,
            totalproduct: req.body.qty,
            totalprice: price
        });
        const order_detail = await req.context.models.order_detail.create({
            order_id: order.order_id,
            product_id: product.product_id,
            quantity: req.body.qty
        });
        const currentQty=product.qty-req.body.qty;
        const rows = await req.context.models.product.update({
            qty: currentQty,
        },{ 
            returning: true, 
            where: { product_id: product.product_id } 
        });
        return res.send(rows);
    } catch (error) {
        return res.send(error);
    }
};

export default {
    addOrder
  };