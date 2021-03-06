
const UserModel=require('../../models/User.js');
class userService{
    async findUser(filter){
        const user=await UserModel.findOne(filter);
        return user;
    }
    async createUser(data){
        const user=await UserModel.create(data);
        return user;
    }
    async updateUser(filter,update){
        const user=await UserModel.findOneAndUpdate(filter,update);
        return user;
    }
}

module.exports=new userService();