const tokenService = require('../Services/tokens/token-service');

module.exports = async function (req, res, next) {

    try {
        // const { accessToken } = req.cookies;
        const { accesstoken } = req.body;
        if (!accesstoken) {
            throw new Error('accesToken Not found')
        }
        const userData = await tokenService.verifyAccessToken(accesstoken)
        if (!userData) {
            throw new Error();
        }
        else {
            req.user = userData;
        }

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ status: false, message: 'Invalid Token ' })
        return;
    }


}
