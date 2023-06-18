import { sequelize } from "../../schema/init-models";

const createUser = async (req, res) => {
    try {
        const user = await req.context.models.users.create({
            username: req.body.username,
        });
        return res.send(user);
    } catch (error) {
        return res.send(error);
    }
};

const findAll = async (req,res) => {
    try {
        const user = await req.context.models.users.findAll();
        return res.send(user);
    } catch (error) {
        return res.send(user);
    }
}


export default {
    createUser,
    findAll
}