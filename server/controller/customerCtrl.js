import { sequelize } from "../../schema/init-models";



const findOne = async (req, res) => {
  try {
    const users = await req.context.models.users.findOne({
      where: { username: req.body.username },
    });
    const {username} = users.dataValues;
    const customer = await req.context.models.customers.findOne({
      where: { user_id: users.id}
    });
    const {firstname,lastname} = customer.dataValues;
    return res.send({username,firstname,lastname});
  } catch (error) {
    return res.send(error);
  }
};

const yourOrder = async (req,res) => {
  try {
      await sequelize.query('select b.firstname,b.lastname,c.totalprice,c.totalproduct,e.name from users a join customers b on a.id=b.user_id join orders c on a.id=c.user_id join order_detail d on c.order_id=d.order_id join product e on e.product_id=d.product_id where a.username = :username',
      {replacements : {username : req.body.username},type : sequelize.QueryTypes.SELECT}
      ).then(result => {
          return res.send(result)
      })
      // const user = await req.context.models.users.findAll({
      //   where : {username: req.body.username},
      //   attributes: ["username"],
      //   include: [{
      //     model: req.context.models.customers,
      //     as: "customers",
      //     required: true,
      //     attributes: ["firstname","lastname"],
      //   }
      // ]
      // });
      // return res.send(user);
  } catch (error) {
      return res.send(error);
  }
}

// const findAll = async (req, res) => {
//   try {
//     const rows = await req.context.models.countries.findAll();
//     return res.send(rows);
//   } catch (error) {
//     return res.send(error);
//   }
// };
// const create = async (req, res) => {
//   try {
//     const rows = await req.context.models.countries.create({
//       country_name: req.body.name,
//     });
//     return res.send(rows);
//   } catch (error) {
//     return res.send(error);
//   }
// };

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
  findOne,
  yourOrder
};