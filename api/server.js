const express = require('express');
const db = require('./module/db');
const help = require('./module/help');
const bodyParser = require('body-parser');
const jwt = require('./module/jwt');
const upPic = require('./module/upPic');
const shop = require('./router/shop');
const goods = require('./router/goods');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
/* app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
}); */

/* 管理员登录接口 */
app.post("/login", (req, res) => {
    const adminName = req.body.adminName;
    const passWord = help.enmd5(req.body.passWord);
    // console.log(passWord);
    db.findOne("adminList", {
        adminName,
        passWord
    }, (err, adminInfo) => {
        if(adminInfo) {
            //查找成功,更新最后登录的时间，在adminLoginLog集合中添加一条记录
            //返回一个token令牌
            db.updateOne("adminList", {
                _id: adminInfo._id
            }, {
                $set: {
                    lastTime: Date.now()
                }
            }, (err) => {
                db.insertOne("adminLoginLog", {
                    adminName: adminInfo.adminName,
                    logTime: Date.now()
                }, (err) => {
                    res.json({
                        ok: 1,
                        msg: "登录成功",
                        token: jwt.encode(adminInfo.adminName),
                        adminName: adminInfo.adminName
                    })
                })
            })
        } else {
            //查找失败
            help.json(res, -1, "账号或密码错误");
        }
    })
});

/* 验证路由请求头 */
app.all("*", (req, res, next) => {
    // const info = jwt.decode(req.headers.authorization);
    // // console.log(info);
    // if(info.ok === 1) {
    //     next();
    // } else {
    //     res.json(info);
    // }
    next();
})

/* 获取管理员日志接口 */
app.get("/adminLog", (req, res) => {
    setTimeout(() => {
        const pageSize = 6; //每页显示的记录数
        let pageIndex = (req.query.pageIndex || 1) / 1;
        db.count("adminLoginLog", {}, (err, total) => {
            let pageSum = Math.ceil(total / pageSize);
            if(pageIndex > pageSum >= 1) pageIndex = pageSum;
            if(pageIndex < 1) pageIndex = 1;
            if(pageSum < 1) pageIndex = pageSum = 1;
            db.find("adminLoginLog", {
                skip: (pageIndex- 1) * pageSize,
                limit: pageSize,
                sortObj: {
                    logTime: -1
                }
            }, (err, adminLog) => {
                res.json({
                    ok: 1,
                    msg: "成功",
                    adminLog,
                    pageSize,
                    total,
                    pageIndex
                })
            })
        }) 
    }, 1000)
});
/* 删除管理员登录日志 */
app.delete("/deleteLoginLog", (req, res) => {
    // console.log(req.body);
    db.deleteOneById("adminLoginLog", req.body.id, (err, results) => {
        help.json(res, 1, "删除成功");
    })
});

/* ********************************* 店铺类别相关 *********************************************** */
/* 添加店铺 */
app.post("/shopType", (req, res) => {
    upPic("shopTypePic", req, (obj) => {
        // console.log(obj);
        if(obj.ok === 3) {
            db.insertOne("shopTypeList", {
                addTime: Date.now(),
                upTime: Date.now(),
                shopTypePic: obj.params.newPicName,
                shopTypeName: obj.params.shopTypeName
            }, (err, results) => {
                if(err) help.json(res);
                else help.json(res, 1, "上传成功");
            })
        } else {
            help.json(res);
        }
    })
});
/* 获取店铺类别信息接口 */
app.get("/shopType", (req, res) => {
    // console.log(req.headers);
    let pageIndex = (req.query.pageIndex || 1) / 1;
    const pageSize = 6;
    db.count("shopTypeList", {}, (err, total) => {
        let pageSum = Math.ceil(total / pageSize);
        if(pageIndex > pageSum >= 1) pageIndex = pageSum;
        if(pageIndex < 1) pageIndex = 1;
        if(pageSum < 1) pageIndex = pageSum = 1;
        db.find("shopTypeList", {
            skip: (pageIndex- 1) * pageSize,
            limit: pageSize,
            sortObj: {
                addTime: -1
            }
        }, (err, shopTypeList) => {
            res.json({
                ok: 1,
                msg: "成功",
                shopTypeList,
                pageSize,
                total,
                pageIndex
            })
        })
    })
});
/* 获取所有的店铺类别 */
app.get("/allShopType", shop.allShopType);
/* 删除店铺类别 */
app.delete("/deleteShopType", shop.deleteShopType);
/* 修改店铺类别信息 */
app.post("/upShopType", shop.upShopType);
/* 查找店铺类别 */
app.get("/findByShopTypeName", shop.findByShopTypeName);
/* 轮播图接口 接收一个参数num（查找的文档条数）  */
app.get("/slideList/:num", shop.getSlideList);

/* ************************************** 店铺相关 ********************************************************* */
/* 添加店铺 */
app.post("/shop", shop.addShop);
/* 获取所有店铺 */
app.get("/shopList", shop.getShopList);
/* 根据typeId获取店铺 */
app.get("/shopList/:typeId", shop.getShopListById)
/* 删除店铺 */
app.delete("/deleteShopList", shop.deleteShopList);
/* 根据店铺名查找店铺 */
app.get("/findByShopName", shop.findByShopName);
/* 根据ID查找店铺 */
app.get("/shop/:id", shop.getShopById);
/* 更新店铺 */
app.post("/upShop", shop.upShop);
/* 查找推荐店铺 */
app.get("/topShopList", shop.topShopList);

/* *************************************** 商品类别相关 ******************************************************************* */
/* 添加商品类别 */
app.post("/goodsType", goods.addGoodsType);
/* 获取所有商品类别 */
app.get("/goodsTypeList", goods.getGoodsTypeList);
/* 删除商品类别 */
app.delete("/deleteGoodsType", goods.deleteGoodsType);
/* 查找 */
app.get("/findByGoodsTypeName", goods.findByGoodsTypeName);
/*  */
app.get("/goodsTypeList/:shopId", goods.getGoodsTypeListByShopId);
/* 更新商品类别 */
app.post("/upGoodsType", goods.upGoodsType);

/* ****************************************** 商品相关 *************************************************************************** */
/* 添加商品 */
app.post("/goods", goods.addGoods);
/* 获取商品 */
app.get("/goodsList", goods.getGoodsList);
/* 根据店铺ID获取商品 */
app.get("/goodsInfo/:shopId", goods.goodsInfo);
/* 删除商品 */
app.delete("/deleteGoodsList", goods.deleteGoodsList);
/* 查找商品 */
app.get("/findByGoodsName", goods.findByGoodsName);
/* 更新商品 */
app.post("/upGoods", goods.upGoods);

app.listen(80, () => {
    console.log("success");
})