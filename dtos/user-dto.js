class userDto{
    _id;
    username;
    email;
    createdAt;

    constructor(room){
        this._id=room._id;
        this.username=room.username;
        this.email=room.email;
        this.createdAt=room.createdAt;
    }
}

module.exports = userDto;