import { sequelize } from "../../schema/init-models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    if (req.body.username == "") {
        return res.status(401).send({ message: "Failed! Username is not null" });
    }
    if (req.body.password == "") {
        return res.status(401).send({ message: "Failed! Password is not null" });
    }
    if (req.body.firstname == "") {
        return res.status(401).send({ message: "Failed! First Name is not null" });
    } 
    if (req.body.lastname == "") {
        return res.status(401).send({ message: "Failed! Last Name is not null" });
    } 
    try {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password, salt);
        const user = await req.context.models.users.create({
            username: req.body.username,
            password: passHash,
        });
        const { id,username } = user.dataValues;
        const customer = await req.context.models.customers.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            user_id: user.id
        })
        const {firstname, lastname} = customer.dataValues;
        return res.send({ username, firstname, lastname });
    } catch (error) {
        return res.send(error);
    }
};

const userLogin = async (req, res) => {
    try{
        const result = await req.context.models.users.findOne({
            where: {username : req.body.username},
        });
        if(!result){
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        if(bcrypt.compareSync(req.body.password,result.password)){
            let token = jwt.sign(
                {
                  user_id: result.user_id,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "2h",
                }
              );
            const {username,email,phone} = result.dataValues
              let output = {
                userdata: {username,email,phone},
                accessToken: token,
            };
            return res.status(200).json({message: 'Berhasil login',output})
        }
        return res.status(404).json({ message: 'Password salah' });
    }
    catch(error){
        return res.send(error);
    }
  };

  
  const verify = async (req,res,next) => {
    const bearer = req.headers.authorization;
    const token = bearer.split(" ");
    jwt.verify(token[1],process.env.SECRET_KEY, (error,data)=> {
        if (error) {
            console.info(error.message);
            return res.json(error)
        }
        req.body=data
        next()
    })
  }

export default {
    createUser,
    userLogin,
    verify
}