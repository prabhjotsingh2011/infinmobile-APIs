class inventoryDTO{
    constructor(room){
        this.inventoryId = room._id;
        this.productName = room.productName;
        this.productDescription = room.productDescription;
        this.productPrice = room.productPrice;
        this.productCategory = room.productCategory;
        this.productImage = room.productImage;
        this.sizes = room.sizes;
    }
}

module.exports =inventoryDTO;