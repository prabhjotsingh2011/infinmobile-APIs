class shopDto{
    constructor(room){
        this.shopId = room._id;
        this.shopName = room.shopName;
        this.website = room.website;
        this.shopDescription = room.shopDescription;
        this.logo = room.logo;
        this.companyUEN = room.companyUEN;
        this.notification = room.notification;
        

        // this.user = room.user;
    }
}

module.exports = shopDto;