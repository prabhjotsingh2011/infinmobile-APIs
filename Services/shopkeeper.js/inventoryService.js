

class  inventorService{
    async createInventory(inventory){
        const newInventory=await invetoryModel.create(inventory);
        return newInventory;
    }
}