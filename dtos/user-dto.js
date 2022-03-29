class userDto {
    // _id
    // firstName
    // lastName
    // DOB
    // username
    // email
    // createdAt

    constructor(room) {
        this._id = room._id;
        this.username = room.username;
        this.email = room.email;
        this.createdAt = room.createdAt;
        this.firstName = room.firstName;
        this.lastName = room.lastName;
        this.photo = room.photo;
        this.DOB = room.DOB;
        this.AuthId = room.AuthId;
        // this.pushNotification = room.pushNotification;
        // this.chatNotification = room.chatNotification;
        // this.MentionInComments = room.MentionInComments;
        // this.FollowingSellerWentLive = room.FollowingSellerWentLive;
        // this.OrderStatus = room.OrderStatus;
        this.notification= room.notification;
        
    }
}

module.exports = userDto;