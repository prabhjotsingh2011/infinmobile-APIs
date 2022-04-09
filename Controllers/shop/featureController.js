const userService = require('../../Services/user/user-service');
const userDto = require('../../dtos/user-dto');

class featureCollection {

    async follow(req, res) {

        const { senderUserId, receiverUserId } = req.body;
        if(!senderUserId || !receiverUserId) return res.status(400).send({status:false ,message: 'All fields are required'});
        try {

            const senderUser = await userService.findUser({ _id: senderUserId });
            if (!senderUser) return res.status(401).json({ message: 'Invalid user' });
            const receiverUser = await userService.findUser({ _id: receiverUserId });
            if (!receiverUser) return res.status(401).json({ message: 'Invalid user' });
            const isExist = await userService.findUser({ _id: receiverUserId,  followers: senderUserId  });

            if (isExist)
                return res.status(200).json({ message: 'Already following' });
            else {
                try {
                // console.log(...receiverUser.follow.followers);
                const user = await userService.updateUser({ _id: receiverUserId }, {
                    $push: {
                        followers: senderUserId
                    },
                    followersCount: receiverUser.followersCount + 1
                });

                const sendusr = await userService.updateUser({ _id: senderUserId }, {
                    $push: {
                        followings: receiverUserId
                    },
                    followingsCount: senderUser.followingsCount + 1

                });


                const currUser = await userService.findUser({ _id: receiverUserId });
                return res.status(200).json({ message: 'Followed successfully', user: new userDto(currUser) });
                }
                catch (error) {
                    return res.status(500).json({ message: 'Something went wrong while following' });
                }
            }

        } catch (err) {
            // console.log(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    


    async unfollow(req, res) {
        const { senderUserId, receiverUserId } = req.body;
        if(!senderUserId || !receiverUserId) return res.status(400).send({status:false ,message: 'All fields are required'});
        try {

            const senderUser = await userService.findUser({ _id: senderUserId });
            if (!senderUser) return res.status(401).json({ message: 'Invalid user' });
            const receiverUser = await userService.findUser({ _id: receiverUserId });
            if (!receiverUser) return res.status(401).json({ message: 'Invalid user' });
            const isExist = await userService.findUser({ _id: receiverUserId,  followers: senderUserId  });

            if (!isExist)
                return res.status(200).json({ message: 'Already unfollowed' });
            else {
                // try {
                // console.log(...receiverUser.follow.followers);
                const user = await userService.updateUser({ _id: receiverUserId }, {
                    $pull: {
                        followers: senderUserId
                    },
                    // followersCount: receiverUser.followersCount - 1
                });

                const sendusr = await userService.updateUser({ _id: senderUserId }, {
                    $pull: {
                        followings: receiverUserId
                    },
                    // followingsCount: senderUser.followingsCount - 1

                });
                return res.status(200).json({status:true, message: 'Unfollowed successfully' });
            }
        } catch (error) {   
            return res.status(500).json({status:false, message: 'Internal server error' });
        }
    }

}


module.exports = new featureCollection();