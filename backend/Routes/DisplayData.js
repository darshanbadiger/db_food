const express = require('express')
const router = require('./CreateUser')
const app = express()

router.post('/foodData', (req, res)=>{
    try {
        res.send([global.fooditems, global.food_category_data])
    } catch (error) {
        console.log(error.message)
        res.send("Server Error");
    }
})

module.exports = router;