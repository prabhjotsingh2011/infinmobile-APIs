const jimp = require('jimp');
// const { resolveHostname } = require('nodemailer/lib/shared');
const shopService = require('../../services/shopkeeper.js/shopService.js');
const shopDto = require('../../dtos/shop-dto');
const inventoryDTO = require('../../dtos/inventory-dto.js');
class ShopkeeperController {
    async createShop(req, res) {
        const { shopName, shopDescription, website, companyUEN } = req.body;
        if(!shopName || !shopDescription ) return res.status(404).json({ message: 'Please fill all the fields' });
        if (req.body.id) {
            const shop = await shopService.findShop({ _id: req.body.id });
            if (shop) {
                return res.status(200).json({ message: 'Shop already exists' });
            }
        }
        try {
            const image = await jimp.read(req.file.path);
            image.resize(250, jimp.AUTO);
            image.write(req.file.path);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong while uploading image' });
        }

        try {
            const shop = await shopService.createShop({
                shopName: shopName,
                shopDescription: shopDescription,
                website: website,
                companyUEN: companyUEN,
                logo: req.file.path

            });
            return res.status(200).json({ message: 'Shop created successfully', shop: new shopDto(shop) });
        }
        catch (error) {
            return res.status(500).json({ message: 'Something went wrong while creating shop' });
        }
    }


    async updateShop(req, res) {
        const { shopName, shopDescription, website, companyUEN } = req.body;


        const shop = await shopService.findShop({ _id: req.body.id });
        if (!shop) {
            return res.status(401).json({ message: 'Invalid shop' });
        }
        
        try {
            const updatedShop = await shopService.updateShop({ _id: req.body.id }, {
                shopName: shopName,
                shopDescription: shopDescription,
                website: website,
                companyUEN: companyUEN,
            });
            const newUser = await shopService.findShop({ _id: req.body.id });
            return res.status(200).json({ message: 'Shop updated successfully', shop: new shopDto(newUser) });
        }
        catch (error) {
            return res.status(500).json({ message: 'Something went wrong while updating shop' });
        }
    }


    async createInventory(req, res) {
        const {  inventoryId, productName, productDescription, productPrice, category, sizes } = req.body;
        // const shop = await shopService.findShop({ _id: shopId });
        // if (!shop) {
        //     return res.status(401).json({ message: 'Invalid shop' });
        // }
        if (await shopService.findInventory({ inventoryId: inventoryId })) {
            // try {
                let Allsizes = [];

                for (let i = 0; i < sizes.length; i++) {
                    if (sizes[i]) {
                        Allsizes[i] = {
                            size: sizes[i].size,
                            quantity: sizes[i].quantity,
                            color: sizes[i].color
                        }
                    }
                } 
                const inventory = await shopService.updateInventory({ inventoryId: inventoryId }, {
                    productName: productName,
                    productDescription: productDescription,
                    productPrice: productPrice,
                    category: category,
                    sizes: Allsizes
                });
                const newInventory = await shopService.findInventory({ inventoryId: inventoryId });
                return res.status(200).json({ message: 'Inventory created successfully', inventory:new inventoryDTO( newInventory) });
            // }
            // catch (error) {
                // return res.status(500).json({ message: 'Something went wrong while creating inventory' });
            // }
        }else{
            return res.status(401).json({ message: 'Upload image to create inventory' });
        }

        // const image = await jimp.read(req.file.path);
        // image.resize(250, jimp.AUTO).write(req.file.path);

    }


    async updateShop(req, res) {
        const { shopName, shopDescription, website, companyUEN } = req.body;
        const shop = await shopService.findShop({ _id: req.body.id });
        if (!shop) {
            return res.status(401).json({ message: 'Invalid shop' });
        }


        try {
            const shop = await shopService.updateShop({ _id: req.body.id }, {
                shopName: shopName,
                shopDescription: shopDescription,
                website: website,
                companyUEN: companyUEN,
            });
            const newUser = await shopService.findShop({ _id: req.body.id });
            return res.status(200).json({ message: 'Shop updated successfully', shop: new shopDto(newUser) });
        }
        catch (error) {
            return res.status(500).json({ message: 'Something went wrong while updating shop' });
        }
    }

    async uploadInventoryImage(req, res) {
        const { ShopId } = req.body;
        const shop = await shopService.findShop({ _id: ShopId });
        if (!shop) {
            return res.status(401).json({ message: 'Invalid shop' });
        }
        try {
            const image = await jimp.read(req.file.path);
            image.resize(250, jimp.AUTO);
            image.write(req.file.path);
            const productImage = await shopService.createInventory({
                shopId: ShopId,
                productImage: req.file.path
            });

            // const newUser = await shopService.findShop({ _id: id });
            return res.status(200).json({ message: 'image uploaded successfully', inventory: new inventoryDTO(productImage) });
        }
        catch (error) {
            return res.status(500).json({ message: 'Something went wrong while uploading image please try again ' });
        }
    }

    async notification(req, res) {
        const { ShopId,pushNotification,chatNotification,followerNotification,checkoutNotification,orderSettings,lowStockCount } = req.body;
        const shop = await shopService.findShop({ _id: ShopId });
        if (!shop) {
            return res.status(401).json({ message: 'Invalid shop' });
        }
        try {
            let notification = {
                pushNotification: pushNotification,
                chatNotification: chatNotification,
                followerNotification: followerNotification,
                checkoutNotification: checkoutNotification,
                orderSettings: orderSettings,
                lowStockCount: lowStockCount
            }
            const shop = await shopService.updateShop({ _id: ShopId }, {notification: notification});
            const newUser = await shopService.findShop({ _id: ShopId });
            return res.status(200).json({ message: 'Notification updated successfully', shop: new shopDto(newUser) });
        }
        catch (error) {
            return res.status(500).json({ message: 'Something went wrong while updating notification' });
        }
    }

    async getInventory(req, res) {  
        const { ShopId } = req.body;
        const shop = await shopService.findShop({_id:ShopId });
        if (!shop) {
            return res.status(401).json({ message: 'Invalid shop' });
        }
        try {
            const inventory = await shopService.findAllInventory({ shopId: ShopId });
            return res.status(200).json({ message: 'Inventory fetched successfully', inventory: inventory.map(inventory => new inventoryDTO(inventory)) });
        }
        catch (error) {
            return res.status(500).json({ message: 'Something went wrong while fetching inventory' });
        }
    }

}

module.exports = new ShopkeeperController();


