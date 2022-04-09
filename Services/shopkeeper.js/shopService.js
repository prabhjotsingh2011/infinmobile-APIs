
const ShopModel = require('../../models/Shops.js');
const invetoryModel = require('../../models/inventory.js');

class shopService{
    async createShop(shop){
        const newShop=await ShopModel.create(shop);
        return newShop;
    }
    async findShop(shop){
        const shopData=await ShopModel.findOne(shop);
        return shopData;
    }
    async updateShop(filter,update){    
        const shop=await ShopModel.findOneAndUpdate(filter,update);
        return shop;
    }

    async createInventory(inventory){
        const newInventory=await invetoryModel.create(inventory);
        return newInventory;
    }

    async updateInventory(filter,update){
        const inventory=await invetoryModel.findOneAndUpdate(filter,update);
        return inventory;
    }

    async findInventory(filter){
        const inventory=await invetoryModel.findOne(filter);
        return inventory;
    }

    async findAllInventory(filter){
        const inventory=await invetoryModel.find(filter);
        return inventory;
    }


}

module.exports=new shopService();