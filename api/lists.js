const lists = {
    "data": [
    {
        "id": 369,
        "title": "【普梳】赛络纺 21s",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "178",
        "free": "0",
        "image": "../../images/pic1.jpg",
        "time": "2017/07/05",
        "state": "8",
        "level": "beginner"
    },
    {
        "id": 214,
        "title": "环锭纺 20s",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "246",
        "free": "0",
        "image": "../../images/pic_2.jpg",
        "time": "2017/07/05",
        "state": "8",
        "level": "advanced"
    },
    {
        "id": 121,
        "title": "【普梳】紧密赛络纺 21s",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "223",
        "free": "0",
        "image": "../../images/pic4.jpg",
        "time": "2017/07/05",
        "state": "8",
        "level": "intermediate"
    },
    {
        "id": 378,
        "title": "【OE】环锭纺 12",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "155",
        "free": "0",
        "image": "../../images/pic3.jpg",
        "time": "2017/02/12",
        "state": "7",
        "level": "beginner"
    },
    {
        "id": 1430,
        "title": "【普梳】赛络纺 21s",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "174",
        "free": "0",
        "image": "../../images/pic2.jpg",
        "time": "2017/07/01",
        "state": "6",
        "level": "intermediate"
    },
    {
        "id": 1254,
        "title": "【普梳】环锭纺 21s",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "191",
        "free": "0",
        "image": "../../images/pic1.jpg",
        "time": "2017/07/05",
        "state": "6",
        "level": "beginner"
    },
    {
        "id": 1199,
        "title": "【普梳】赛络纺 21s",
        "desc": "anything 有 want！",
        "likes": "0",
        "views": "306",
        "free": "0",
        "image": "../../images/pic_2.jpg",
        "time": "2017/07/05",
        "state": "6",
        "level": "advanced"
    }],

    // "meta": {
    //     "pagination": {
    //         "total": 50,
    //         "count": 10,
    //         "per_page": 10,
    //         "current_page": 1,
    //         "total_pages": 5,
    //         "links": {
    //         "next": "http://www.alpha-beille.com/api/videos/beginner/10/1/id?page=2"
    //         }
    //     }
    // }
}

const loadLists = (limit, page, query = '') => {
    return lists;
}

module.exports.loadLists = loadLists;