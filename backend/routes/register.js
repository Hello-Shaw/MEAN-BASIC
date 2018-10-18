const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/user');
const Gift = require('../models/gift');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const nodemailer = require('nodemailer');
const { PerformanceObserver, performance } = require('perf_hooks');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.user, // generated ethereal user
        pass: config.pass // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const db = config.database;

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if (err) {
        console.error("error!" + err);
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, config.secretKey);
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;

    // User.findOne({_id: payload.subject})
    //     .then(result => {
    //         // console.log(result);
    //        req.userId =result._id ;
    //
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     });

    next()
}


router.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (user) {

            res.status(200).json({message: 'user already exists'});
        }
        else {
            const newUser = new User();
            let hash = bcrypt.hashSync(req.body.password, 10);
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.email = req.body.email.toLowerCase();
            newUser.password = hash;
            newUser.date = Date.now();

            newUser.save((err, insertUsers) => {
                if (err) {
                    console.log('error saving users');
                } else {
                    let payload = {subject: insertUsers._id};
                    // let token = jwt.sign(payload, 'secretKey');
                    let token = jwt.sign(payload, config.secretKey);
                    res.status(200).send({token})
                }
            });
        }
    });
});

router.post('/login', (req, res) => {
    const start=performance.now();
    console.log("startime  "+start);

    User.findOne({
        email: req.body.username
    }, (err, user) => {
        if (!user) {
            res.status(401).json({message: 'Invalid username'});
        }
        else {
            const result = bcrypt.compareSync(req.body.password, user.password);
            if (!result) {
                // res.status(401).send('Invalid Password');
                res.status(401).json({message: 'Invalid Password'});
            }
            else {
                let payload = {subject: user._id};
                // let token = jwt.sign(payload, 'secretKey');
                let token = jwt.sign(payload, config.secretKey);
                user.updateOne({userName: req.body.userName}, {loggedInToken: token},
                    (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(403).send({
                                error: true,
                                message: 'User token update failed'
                            })
                        }
                    });

                res.status(200).send({token})
            }

        }
    });
    console.log('processing time',performance.now()-start);
});











router.post('/gift', verifyToken, (req, res) => {

    const newGift = new Gift();
    // console.log(req.user);
    newGift.giftname = req.body.giftname;
    newGift.description = req.body.description;
    newGift.owner = req.userId;
    newGift.save((err, insertGift) => {
        if (err) {
            console.log('error saving gifts');
        } else {
            res.json(insertGift)
        }
    })
});




// node version > 8 . cause using ES6 feature : async await
router.post('/mail', verifyToken, async (req, res) => {

    let mygift = '';
   const start = performance.now();
    const user = await  User.findById(req.userId);
    if (!user) {
        //...
        return res.status(404).json({usernotfound: "User not found"});
    }
    const userInfo = user.firstname;
    const gifts = await Gift.find({owner: req.userId});

    console.log('start A - ', start);

    gifts.forEach(gift => {
        let data = gift.giftname;
        mygift += "<li>" + data + "</li>";
    });

    let mailOptions = {
        from: '"AIP 👻"UTS', // sender address
        to: req.body.email, // list of receivers
        subject: 'my wedding giftlist', // Subject line
        html: 'Hello there，this is' + userInfo + '\n\n' + mygift,// html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
    console.log('total - ', performance.now() - start);

});
// const { PerformanceObserver, performance } = require('perf_hooks');





router.get('/gift', verifyToken, (req, res) => {
    // console.log(req);


    Gift.find({owner: req.userId},
        (err, gift) => {
            res.json(gift);

        });


});

// router.get('/gift', verifyToken, async (req, res) => {
//     // console.log(req);
//     const start=performance.now();
//     console.log("startime  "+start);
//
//     const gift= await Gift.findById(req.userId);
//     // Gift.find({owner: req.userId},
//         if(gift)
//             res.json(gift);
//
//
//
//     console.log('processing time',performance.now()-start);
// });










router.delete('/delete/:id', (req, res, next) => {
    Gift.findByIdAndRemove({_id: req.params.id}, (err, gift) => {
        if (err) return next(err);
        res.json(gift);
    });
});


module.exports = router;