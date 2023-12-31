import { sequelize } from "../../schema/init-models";


const findAll = async (req, res) => {
  try {
    const rows = await req.context.models.product.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const findAllCate = async (req,res) => {
  try {
    const rows = await req.context.models.category.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
}

const create = async (req, res) => {
  try {
    const category = await req.context.models.category.findOne({
        where: {catename: req.body.category},
    });
    console.log(category.cateid);
    const rows = await req.context.models.product.create({
      name: req.body.name,
      category: category.cateid,
      stock: req.body.stock,
      price: req.body.price,
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

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
  findAllCate,
  create
};