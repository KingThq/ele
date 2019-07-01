const jwt = require('jwt-simple');
const key = "#$%^&*()";

module.exports = {
    decode(token) {//解密token
        try {
            const info = jwt.decode(token, key);
            if(info.lastTime < Date.now()) {//token 过期
                return {
                    ok: -3,
                    msg: "过期了"
                }
            } else {
                //token 未过期
                return {
                    ok: 1,
                    msg: "成功",
                    info
                }
            }
        } catch (error) {
            return {
                ok: -3,
                msg: "解析失败"
            }
        }
    },
    encode(adminName) {//加密 生成token
        return jwt.encode({
            adminName,//管理员帐号
            lastTime: Date.now() + (100*60*1000)  //token过期时间
        }, key);
    }
}