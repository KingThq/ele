const db = require('../module/db');
const help = require('../module/help');
const upPic = require('../module/upPic');
const mongodb = require('mongodb');

module.exports.addGoodsType = (req, res) => {
    upPic("goodsTypePic", req, (obj) => {
        if(obj.ok === 3) {
            db.findOneById("shopList", obj.params.shopId, (err, shopInfo) => {
                db.insertOne("goodsTypeList", {
                    upTime: Date.now(),
                    addTime: Date.now(),
                    goodsTypePic: obj.params.newPicName,
                    goodsTypeName: obj.params.goodsTypeName,
                    shopName: shopInfo.shopName,
                    shopId: shopInfo._id,
                    shopTypeId: shopInfo.shopTypeId
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

module.exports.getGoodsTypeList = (req, res) => {
    let pageIndex = (req.query.pageIndex || 1) / 1;
    const pageSize = 6;
    db.count("goodsTypeList", {}, (err, total) => {
        let pageSum = Math.ceil(total / pageSize);
        if(pageIndex > pageSum >= 1) pageIndex = pageSum;
        if(pageIndex < 1) pageIndex = 1;
        if(pageSum < 1) pageIndex = pageSum = 1;
        db.find("goodsTypeList", {
            skip: (pageIndex- 1) * pageSize,
            limit: pageSize,
            sortObj: {
                addTime: -1
            }
        }, (err, goodsTypeList) => {
            res.json({
                ok: 1,
                msg: "成功",
                goodsTypeList,
                pageSize,
                total,
                pageIndex
            });
        })
    })
};

module.exports.getGoodsTypeListByShopId = (req, res) => {
    db.find("goodsTypeList", {
        whereObj: {
            shopId: mongodb.ObjectID(req.params.shopId)
        },
        sortObj: {
            addTime: -1
        }
    }, (err, goodsTypeList) => {
        res.json({
            ok: 1, 
            msg: "成功",
            goodsTypeList
        })
    })
};

module.exports.deleteGoodsType = (req, res) => {
    db.deleteOneById("goodsTypeList", req.body.id, (err, results) => {
        if(err) help.json(res);
        else help.json(res, 1, "删除成功");
    })
};

module.exports.upGoodsType = (req, res) => {
    if(req.body.upPicBool/1 === 1) {
        //不更新图片
        db.updateOneById("goodsTypeList", req.body.goodsTypeId, {
            $set: {
                goodsTypeName: req.body.goodsTypeName,
                shopName: req.body.shopName,
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
        upPic("goodsTypePic", req, obj => {
            if(obj.ok === 3) {
                //更新图片
                db.updateOneById("goodsTypeList", obj.params.goodsTypeId, {
                    $set: {
                        goodsTypeName: obj.params.goodsTypeName,
                        shopName: obj.params.shopName,
                        goodsTypePic: obj.params.newPicName,
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

module.exports.findByGoodsTypeName = (req, res) => {
    if(req.query.goodsTypeName) {
        whereObj = {
            goodsTypeName: new RegExp(req.query.goodsTypeName)
        }
    } else whereObj = {};
    db.find("goodsTypeList", {
        whereObj,
        sortObj: {
            addTime: -1
        }
    }, (err, goodsTypeList) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                goodsTypeList
            })
        }
    })
};

module.exports.addGoods = (req, res) => {
    upPic("goodsPic", req, (obj) => {
        if(obj.ok === 3) {
            db.findOneById("goodsTypeList", obj.params.goodsTypeId, (err, goodsTypeInfo) => {
                // console.log(goodsTypeInfo, obj.params);
                db.insertOne("goodsList", {
                    upTime: Date.now(),
                    addTime: Date.now(),
                    goodsPic: obj.params.newPicName,
                    goodsName: obj.params.goodsName,
                    goodsPrice: obj.params.goodsPrice / 1,
                    isHot: obj.params.isHot,
                    shopName: goodsTypeInfo.shopName,
                    shopId: goodsTypeInfo.shopId,
                    shopTypeId: goodsTypeInfo.shopTypeId,
                    goodsTypeName: goodsTypeInfo.goodsTypeName
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

module.exports.getGoodsList = (req, res) => {
    let pageIndex = (req.query.pageIndex || 1) / 1;
    const pageSize = 6;
    db.count("goodsList", {}, (err, total) => {
        let pageSum = Math.ceil(total / pageSize);
        if(pageIndex > pageSum >= 1) pageIndex = pageSum;
        if(pageIndex < 1) pageIndex = 1;
        if(pageSum < 1) pageIndex = pageSum = 1;
        db.find("goodsList", {
            skip: (pageIndex- 1) * pageSize,
            limit: pageSize,
            sortObj: {
                addTime: -1
            }
        }, (err, goodsList) => {
            res.json({
                ok: 1,
                msg: "成功",
                goodsList,
                pageSize,
                total,
                pageIndex
            });
        })
    })
};

module.exports.goodsInfo = (req, res) => {
    db.find("goodsList", {
        whereObj: {
            shopId: mongodb.ObjectID(req.params.shopId)
        },
        sortObj: {
            addTime: -1
        }
    }, (err, goodsList) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                goodsList
            })
        }
    })
};

module.exports.deleteGoodsList = (req, res) => {
    db.deleteOneById("goodsList", req.body.id, (err, results) => {
        if(err) help.json(res);
        else help.json(res, 1, "删除成功");
    })
};

module.exports.findByGoodsName = (req, res) => {
    if(req.query.goodsName) {
        whereObj = {
            goodsName: new RegExp(req.query.goodsName)
        }
    } else whereObj = {};
    db.find("goodsList", {
        whereObj,
        sortObj: {
            addTime: -1
        }
    }, (err, goodsList) => {
        if(err) help.json(res);
        else {
            res.json({
                ok: 1,
                goodsList
            })
        }
    })
};

module.exports.upGoods = (req, res) => {
    if(req.body.upPicBool/1 === 1) {
        //不更新图片
        db.updateOneById("goodsList", req.body.goodsId, {
            $set: {
                goodsTypeName: req.body.goodsTypeName,
                goodsName: req.body.goodsName,
                isHot: req.body.isHot,
                goodsPrice: req.body.goodsPrice,
                shopName: req.body.shopName,
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
        upPic("goodsPic", req, obj => {
            if(obj.ok === 3) {
                //更新图片
                db.updateOneById("goodsList", obj.params.goodsId, {
                    $set: {
                        goodsTypeName: obj.params.goodsTypeName,
                        goodsName: obj.params.goodsName,
                        isHot: obj.params.isHot,
                        goodsPrice: obj.params.goodsPrice,
                        shopName: obj.params.shopName,
                        goodsPic: obj.params.newPicName,
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