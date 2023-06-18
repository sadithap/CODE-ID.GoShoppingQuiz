import { sequelize } from "../../schema/init-models";


const findAll = async (req, res) => {
  try {
    const rows = await req.context.models.product.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const category = await req.context.models.product_category.findOne({
        where: {name: req.body.category},
        raw: true
    })
    console.log(category.category_id);
    const rows = await req.context.models.product.create({
      name: req.body.name,
      description: req.body.description,
      category_id: category.category_id,
      price: req.body.price,
      image: req.file.filename,
      qty: req.body.qty
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const findByCategory = async (req,res) => {
    try {
        const product = await req.context.models.product_category.findAll({
            include: [{
                model: req.context.models.product,
                as: "product"
            }],
            include: {all:true}
        })
        return res.send(product);
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
  create,
  findByCategory
};