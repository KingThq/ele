const db = require("../module/db");
const upPic = require("../module/upPic");
const help = require("../module/help");
const mongo = require('mongodb');

module.exports.allShopType = (req, res) => {
    db.find("shopTypeList", {
        sortObj: {
            addTime: -1
        }
    }, (err, shopTypeList) => {
        res.json({
            ok: 1,
            msg: "成功",
            shopTypeList
        })
    })
};

module.exports.deleteShopType = (req, res) => {
    db.deleteOneById("shopTypeList", req.body.id, (err, results) => {
        if(err) help.json(res);
        else help.json(res, 1, "删除成功");
    })
};

module.exports.upShopType = (req, res) => {
    if(req.body.upPicBool/1 === 1) {
        // console.log(11111, req.body);
        //不更新图片
        db.updateOneById("shopTypeList", req.body.shopTypeId, {
            $set: {
                shopTypeName: req.body.shopTypeName,
                upTime: Date.now()
            }
        }, (err, results) => {
            if(err) help.json(res);
            else res.json({
                ok: 1,
                msg: "成功"
            });
        })
    } else {
        upPic("shopTypePic", req, obj => {
            if(obj.ok === 3) {
                //更新图片
                db.updateOneById("shopTypeList", obj.params.shopTypeId, {
                    $set: {
                        shopTypeName: obj.params.shopTypeName,
                        shopTypePic: obj.params.newPicName,
                        upTime: Date.now()
                    }
                }, (err, results) => {
                    if(err) help.json(res);
                    else res.json({
                        ok: 1,
                        msg: "成功"
                    });
                })
            } else {
                help.json(res);
            }
        })
    }
};

module.exports.findByShopTypeName = (req, res) => {
    if(req.query.shopTypeName) {
        whereObj = {
            shopTypeName: new RegExp(req.query.shopTypeName)
        }
    } else whereObj = {};
    db.find("shopTypeList", {
        whereObj,
        sortObj: {
            addTime: -1
        }
    }, (err, shopTypeList) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                shopTypeList
            })
        }
    })
};

module.exports.getSlideList = (req, res) => {
    db.find("shopTypeList", {
        limit: (req.params.num || 1) / 1,
        sortObj: {
            addTime: -1
        }
    }, (err, shopTypeList) => {
        if(err) help.json(res);
        else {
            //将一维数组变成二维数组
            const n = 10;  //每个数组有10个元素
            let len = Math.ceil(shopTypeList.length / n);
            let arr = [];
            for(let i = 0; i < len; i ++) {
                arr.push([]);
                for(let j = i*n; j < (i+1)*n && j < shopTypeList.length; j ++) {
                    arr[i].push(shopTypeList[j]);
                }
            }
            res.json({
                ok: 1,
                slideList: arr
            })
        }
    })
};

module.exports.addShop = (req, res) => {
    upPic("shopPic", req, (obj) => {
        if(obj.ok === 3) {
            db.findOneById("shopTypeList", obj.params.shopTypeId, (err, shopTypeInfo) => {
                db.insertOne("shopList", {
                    upTime: Date.now(),
                    addTime: Date.now(),
                    shopPic: obj.params.newPicName,
                    shopName: obj.params.shopName,
                    shopTypeName: shopTypeInfo.shopTypeName,
                    shopTypeId: shopTypeInfo._id,
                    isTop: obj.params.isTop
                }, (err, results) => {
                    if(err) help.json(res);
                    else help.json(res, 1, "上传成功");
                })
            })
        } else {
            help.json(res);
        }
    })
};

module.exports.getShopList = (req, res) => {
    let pageIndex = (req.query.pageIndex || 1) / 1;
    const pageSize = 6;
    db.count("shopList", {}, (err, total) => {
        let pageSum = Math.ceil(total / pageSize);
        if(pageIndex > pageSum >= 1) pageIndex = pageSum;
        if(pageIndex < 1) pageIndex = 1;
        if(pageSum < 1) pageIndex = pageSum = 1;
        db.find("shopList", {
            skip: (pageIndex- 1) * pageSize,
            limit: pageSize,
            sortObj: {
                addTime: -1
            }
        }, (err, shopList) => {
            res.json({
                ok: 1,
                msg: "成功",
                shopList,
                pageSize,
                total,
                pageIndex
            });
        })
    })
};

module.exports.getShopListById = (req, res) => {
    db.find("shopList", {
        whereObj: {
            shopTypeId: mongo.ObjectID(req.params.typeId)
        },
        sortObj: {
            addTime: -1
        }
    }, (err, shopList) => {
        res.json({
            ok: 1,
            shopList
        })
    })
};

module.exports.deleteShopList = (req, res) => {
    db.deleteOneById("shopList", req.body.id, (err, results) => {
        if(err) help.json(res);
        else help.json(res, 1, "删除成功");
    })
};

module.exports.findByShopName = (req, res) => {
    if(req.query.shopName) {
        whereObj = {
            shopName: new RegExp(req.query.shopName)
        }
    } else whereObj = {};
    db.find("shopList", {
        whereObj,
        sortObj: {
            addTime: -1
        }
    }, (err, shopList) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                shopList
            })
        }
    })
};

module.exports.upShop = (req, res) => {
    if(req.body.upPicBool/1 === 1) {
        //不更新图片
        db.updateOneById("shopList", req.body.shopId, {
            $set: {
                shopTypeName: req.body.shopTypeName,
                shopName: req.body.shopName,
                isTop: req.body.isTop,
                upTime: Date.now()
            }
        }, (err, results) => {
            if(err) help.json(res);
            else res.json({
                ok: 1,
                msg: "成功"
            });
        })
    } else {
        upPic("shopPic", req, obj => {
            if(obj.ok === 3) {
                //更新图片
                db.updateOneById("shopList", obj.params.shopId, {
                    $set: {
                        shopTypeName: obj.params.shopTypeName,
                        shopName: obj.params.shopName,
                        shopPic: obj.params.newPicName,
                        isTop: obj.params.isTop,
                        upTime: Date.now()
                    }
                }, (err, results) => {
                    if(err) help.json(res);
                    else res.json({
                        ok: 1,
                        msg: "成功"
                    });
                })
            } else {
                help.json(res);
            }
        })
    }
};

module.exports.topShopList = (req, res) => {
    db.find("shopList", {
        whereObj: {
            isTop: 'true'
        },
        sortObj: {
            addTime: -1
        }
    }, (err, shopList) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                shopList
            })
        }
    })
};

module.exports.getShopById = (req, res) => {
    db.findOneById("shopList", req.params.id, (err, shopInfo) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                shopInfo
            })
        }
    })
}