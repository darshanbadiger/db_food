const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecrete = "DarshanBadiger@1234556789"

/*const insert=async ()=>{
    try{await User.create({
        name:"D",
        location:"H",
        email:"a@gmail.com",
        password:"123456"
    });
    console.log("Success")
}
    catch(err){
        console.log(err)
    }
}
insert();*/

router.post('/createuser',
    [body('email', 'Invalid Email Address').isEmail(),
    body('name', 'Invalid username').isLength({ min: 4 }),
    body('password', 'Invalid Password Length').isLength({ min: 4 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            res.json({ success: true })

        } catch (error) {
            console.error(error);
            res.json({ success: false })
        }
    })




router.post('/loginuser',
    [body('email', 'Invalid Email Address').isEmail(),
    body('password', 'Invalid Password Length').isLength({ min: 4 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try login with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                // if (userData.password !== req.body.password) {
                return res.status(400).json({ errors: "Enter correct email ID/Password" })
            }

            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecrete)
            return res.json({ success: true, authToken:authToken })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })

module.exports = router;