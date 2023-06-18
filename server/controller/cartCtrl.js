import { sequelize } from "../../schema/init-models";



const findAll = async (req,res) => {
  try {
    const rows = await req.context.models.itemproduct.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
}

const addToCart = async (req,res) => {
  try {
    const product = await req.context.models.product.findOne({
      where : {name: req.body.product}
    });
    if(product.stock===0){
      return res.status(404).json({ message: 'produk kosong' });
    }
    const minusQty=product.stock-req.body.qty;
    if(minusQty<0){
      return res.status(404).json({ message: 'stok tidak cukup' });
    }
    const user = await req.context.models.users.findOne({
      where: {username:req.body.username}
    });
    const subPrice=(parseInt(product.price))*req.body.qty;
    console.log(product.price);
    const item = await req.context.models.itemproduct.create({
      product : product.prodid,
      qty: req.body.qty,
      subtotal: subPrice,
      userid: user.userid
    });
    const cart = await req.context.models.cart.create({
      product : product.prodid,
      qty: req.body.qty,
      subtotal: subPrice,
      userid: user.userid
    });
    const newQty = await req.context.models.product.update({
      stock: minusQty
    },
    {
      returning: true, where: {prodid: product.prodid}
    });
    return res.send(cart);
  } catch (error) {
    return res.send(error);
  }
}

// const update = async (req, res) => {
//   try {
//     const rows = await req.context.models.countries.update(
//       {
//         country_name: req.body.name,
//       },
//       { returning: true, where: { country_id: req.params.id } }
//     );
//     return res.send(rows);
//   } catch (error) {
//     return res.send(error)
//   }
// };

// const deleted = async(req,res) => {
//     try {
//         const rows = await req.context.models.countries.destroy({
//             where:{country_id : req.params.id}
//         })
//         return res.send('delete '+rows+' row')
//     } catch (error) {
//         return res.send(error)
//     }
// }

// const querySQL = async(req,res) => {
//     try {
//         await sequelize.query('select * from countries where country_id = :id',
//         {replacements : {id : req.params.id},type : sequelize.QueryTypes.SELECT}
//         ).then(result => {
//             return res.send(result)
//         })
//     } catch (error) {
//         return res.send(error)
//     }
// }
export default {
  findAll,
  addToCart
};