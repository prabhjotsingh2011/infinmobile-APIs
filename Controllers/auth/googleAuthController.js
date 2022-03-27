

class googleAuthController{

    async googleAuth(req,res){
        console.log('====================================');
        console.log(req.user);
        console.log('====================================');
        const {idToken}=req.body;
        console.log(idToken);
        // const googleUser=await googleAuthService.verifyToken(idToken);
        // if(!googleUser)
        //     return res.status(401).json({message:'Invalid token'});
        // const user=await userService.findUser({email:googleUser.email});
        // if(!user)
        //     return res.status(401).json({message:'Invalid user'});
        // const token=await authService.generateToken(user);
        // return res.status(200).json({token:token,user:new userDto(user)});
    }

}

module.exports = new googleAuthController();