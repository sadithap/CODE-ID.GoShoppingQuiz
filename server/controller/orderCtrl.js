import { literal, fn } from "../../schema/init-models";

const createOrder = async (req,res) => {
    try {
        const cart = await req.context.models.cart.findAll();
        if(cart.length===0){
            return res.status(404).json({ message: 'belanja dulu' });
        }
        let total=0;
        cart.forEach((data) => {
            total+=parseInt(data.subtotal);
        });
        const user = await req.context.models.users.findOne({
            where : {username: req.body.username}
        });
        const order = await req.context.models.orders.create({
            userid : user.userid,
            totalprice : total,
            status : `OPEN`
        });
        const orderline = cart.map((data) =>({
            product : data.product,
            qty : data.qty,
            subtotal : data.subtotal,
            orderid : order.orderid
        }));

        const orderlineitem = await req.context.models.orderlineitem.bulkCreate(orderline);
        const deletecart = await req.context.models.cart.destroy({
            where : {}
        });
        return res.send(order);
    } catch (error) {
        return res.send(error);
    }
}

const closeOrder = async (req,res) => {
    try {
        const order = await req.context.models.orders.update({
            status : `CLOSED`
        },
        {
            returning: true, where: {status: `OPEN`}
          })
        const deletelineitem = await req.context.models.orderlineitem.destroy({
            where : {}
        });
        return res.send(order)
    } catch (error) {
        return res.send(error)
    }
}

const cancelOrder = async (req,res) => {
    try {
        const itemline = await req.context.models.orderlineitem.findAll();
        for(const data of itemline){
            await req.context.models.product.increment({
                stock: data.qty
            },{
                where: {prodid : data.product}
            })
        }
        const order = await req.context.models.orders.update({
            status : `CANCELLED`
        },
        {
            returning: true, where: {status: `OPEN`}
        });
        const deletelineitem = await req.context.models.orderlineitem.destroy({
            where : {}
        });
        return res.send(order);
    } catch (error) {
        return res.send(error);
    }
}

export default {
    createOrder,
    closeOrder,
    cancelOrder
  };