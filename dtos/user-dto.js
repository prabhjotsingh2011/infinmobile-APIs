class userDto {
    // _id
    // firstName
    // lastName
    // DOB
    // username
    // email
    // createdAt

    constructor(room) {
        this.id = room._id;
        this.username = room.username;
        this.email = room.email;
        this.createdAt = room.createdAt;
        this.firstname = room.firstname;
        this.lastname = room.lastname;
        this.photo = room.photo;
        this.date_of_birth = room.date_of_birth;
        this.authid = room.authid;
        // this.pushNotification = room.pushNotification;
        // this.chatNotification = room.chatNotification;
        // this.MentionInComments = room.MentionInComments;
        // this.FollowingSellerWentLive = room.FollowingSellerWentLive;
        // this.OrderStatus = room.OrderStatus;
        this.notification = room.notification;

    }
}

module.exports = userDto;