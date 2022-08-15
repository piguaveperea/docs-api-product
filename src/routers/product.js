const router = require('express').Router();
const model = require('../models/products')
router.get('/products', async (req, res)=>{
   const products = await model.findAll();
   res.json(products)
})

router.post('/post', (req, res)=>{

})

module.exports = router