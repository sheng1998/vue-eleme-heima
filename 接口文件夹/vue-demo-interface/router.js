/*
    router.js 路由模块
*/

//专门用来包装路由的
var express = require('express'); // 加载 express 模块(nodejs框架)
var Home = require('./models/home.js');
var New = require('./models/news.js');
var NewInfo = require('./models/newInfo.js');
var Comment = require('./models/comments.js');
var Imgcategory = require('./models/imgcategory.js');
var Img = require('./models/img.js');
var ImgInfo = require('./models/imgInfo.js');
var Thumimages = require('./models/thumimages.js');
var Goods = require('./models/goods.js');
var goodsDesc = require('./models/goodsDesc.js');
var Shopcarlist = require('./models/shopcarlist.js');

var uuid = require('node-uuid');
var url = require('url');
var fs = require('fs');

var router = express.Router();

// 获取轮播图
router.get('/rotation', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    Home.find(function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        }
        res.status(200).json({
            status: 0,
            message: data
        });
    });
})

// 获取新闻列表
router.get('/newslist', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    New.find(function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        }
        for (let i = 0; i < data.length; i++) {
            var click = 0;
            NewInfo.find({
                id: data[i].id
            }, function (e, d) {
                click = d[0].click;
                //根据 id 更新点击次数
                New.update({
                    id: data[i].id
                }, {
                    click: click
                }, function () {})
            })
        }
        res.status(200).json({
            status: 0,
            message: data
        });
    });
})

// 获取新闻详情
router.get('/getnew/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var id = parseInt(req.url.slice(8));

    NewInfo.find({
        id: id
    }, function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        }

        //根据 id 更新点击次数
        NewInfo.update({
            id: id
        }, {
            click: ++data[0].click
        }, function () {})
        res.status(200).json({
            status: 0,
            message: data
        });
    })
})

// 获取评论信息
router.get('/getcomments/:art/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var pageindex = _url.query.pageindex;
    var url_array = _url.pathname.split('/');
    var art = url_array[2];
    var id = url_array[3];
    var page = 15; //设置每页显示评论条数

    Comment.find({
            sort: art,
            art_id: id
        })
        .sort({
            add_time: -1
        })
        .limit(page)
        .skip(page * (pageindex - 1))
        .exec(function (err, data) {
            if (err) {
                return res.status(200).json({
                    status: 500,
                    message: err
                });
            } else {
                Comment.find({
                    sort: art,
                    art_id: id
                }, function (err, result) {
                    var message = [];
                    for (let i = 0; i < data.length; i++) {
                        var temp = {}
                        temp.user_name = data[i].user_name;
                        temp.add_time = data[i].add_time;
                        temp.content = data[i].content;
                        temp._id = data[i]._id;
                        message.push(temp);
                    }
                    res.status(200).json({
                        status: 0,
                        message: message,
                        Number: result.length
                    });
                })
            }
        });
})

// 保存评论信息
router.post('/postcomment/:art/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');
    var art = url_array[2];
    var id = url_array[3];

    var content = req.body.content;

    new Comment({
        sort: art,
        art_id: id,
        user_name: "匿名用户",
        add_time: new Date(),
        content: content
    }).save(function (err, ret, next) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                status: 0,
                message: "提交评论成功"
            });
        }
    })
})

// 获取图片分类
router.get('/getimgcategory', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    Imgcategory.find(function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        } else {
            var message = [];
            for (let i = 0; i < data.length; i++) {
                var temp = {}
                temp.title = data[i].title;
                temp.id = data[i].id;
                message.push(temp);
            }
            res.status(200).json({
                status: 0,
                message: message
            });
        }
    });
})

// 根据id获取图片
router.get('/getimages/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');
    var condition = {
        imgcategory_id: url_array[2]
    }
    if (parseInt(url_array[2]) === 0) {
        condition = {};
    }

    Img.find(condition, function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        } else {
            res.status(200).json({
                status: 0,
                message: data
            })
        }
    });
})

// 根据 id 获取图片详情
router.get('/getimageInfo/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');

    ImgInfo.find({
        id: url_array[2]
    }, function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        } else {
            res.status(200).json({
                status: 0,
                message: data
            })
        }
    });
})

// 获取缩略图
router.get('/getthumimages/:imgid', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');

    Thumimages.find({
        id: url_array[2]
    }, function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        } else {
            var message = [];
            for (let i = 0; i < data.length; i++) {
                var temp = {}
                temp.src = data[i].src;
                message.push(temp);
            }
            res.status(200).json({
                status: 0,
                message: message
            });
        }
    });
})

// 获取商品列表
router.get('/getgoods', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var pageindex = _url.query.pageindex;
    var page = 10; //设置每页显示评论条数

    Goods.find({
            stock_quantity: {
                $gt: 0
            }
        })
        .sort({
            add_time: -1
        }) //根据 _id 倒序排序
        .limit(page)
        .skip(page * (pageindex - 1))
        .exec(function (err, data) {
            if (err) {
                return res.status(200).json({
                    status: 500,
                    message: err
                });
            } else {
                Goods.find({
                    stock_quantity: {
                        $gt: 0
                    }
                }, function (err, result) {
                    res.status(200).json({
                        status: 0,
                        message: data,
                        Number: result.length
                    });
                })
            }
        });
})

// 获取商品详细信息
router.get('/goods/getinfo/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');

    Goods.find({
        id: url_array[3]
    }, function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        }
        res.status(200).json({
            status: 0,
            message: data
        });
    })
})

// 获取商品图文信息
router.get('/goods/getdesc/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');

    goodsDesc.find({
        id: url_array[3]
    }, function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        }
        res.status(200).json({
            status: 0,
            message: data
        });
    })
})

// 添加到购物车
router.get('/goods/addtoshopcar/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');
    var Num = parseInt(_url.query.Num);

    Goods.find({
        id: url_array[3]
    }, function (err, data) {
        Shopcarlist.find({
            id: url_array[3]
        }, function (err2, data2) {
            if (data2.length === 0) {
                new Shopcarlist({
                    selection: 1,
                    id: parseInt(url_array[3]),
                    title: data[0].title,
                    sell_price: parseInt(data[0].sell_price),
                    thumb_path: data[0].img_url,
                    Num: Num
                }).save(function (err11, data11) {
                    if (err11) {
                        return res.status(200).json({
                            status: 500,
                            message: err11
                        });
                    } else {
                        res.status(200).json({
                            status: 0,
                            message: 'OK'
                        });
                    }
                })
            } else {
                Shopcarlist.update({
                    id: url_array[3]
                }, {
                    Num: parseInt(data2[0].Num) + Num
                }, function (err12, data12) {
                    if (err12) {
                        return res.status(200).json({
                            status: 500,
                            message: err12
                        });
                    } else {
                        res.status(200).json({
                            status: 0,
                            message: 'OK'
                        });
                    }
                })
            }
        })
    })
})

// 获取购物车中商品列表
router.get('/goods/getshopcarlist', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    Shopcarlist.find({})
        .sort({
            add_time: -1
        })
        .exec(function (err, data) {
            if (err) {
                return res.status(200).json({
                    status: 500,
                    message: err
                });
            }
            res.status(200).json({
                status: 0,
                message: data
            });
        })
})

// 修改购物车数据
router.get('/goods/goodschange/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');
    
    if(_url.query.Num){
        Shopcarlist.update({
            id: url_array[3]
        }, {
            Num:_url.query.Num
        }, function (err, data) {
            if (err) {
                return res.status(200).json({
                    status: 500,
                    message: err
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message: 'OK'
                });
            }
        })
    }else{
        Shopcarlist.update({
            id: url_array[3]
        }, {
            selection:_url.query.selection
        }, function (err, data) {
            if (err) {
                return res.status(200).json({
                    status: 500,
                    message: err
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message: 'OK'
                });
            }
        })
    }

    
})

// 删除购物车中商品
router.get('/goods/removegoods/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域

    var _url = url.parse(req.url, true);
    var url_array = _url.pathname.split('/');

    Shopcarlist.findOneAndRemove({
        id: url_array[3]
    }, function (err, ret) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        } else {
            res.status(200).json({
                status: 0,
                message: 'OK'
            });
        }
    })
})

module.exports = router;