class userDto {
    _id;
    firstName;
    lastName;
    DOB;
    username;
    email;
    createdAt;

    constructor(room) {
        this._id = room._id;
        this.username = room.username;
        this.email = room.email;
        this.createdAt = room.createdAt;
        this.firstName = room.firstName;
        this.lastName = room.lastName;
        this.DOB = room.DOB;

    }
}

module.exports = userDto;