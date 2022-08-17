const router = require('express').Router();
const Product = require('../models/products')

//Model Product
/**
 * @swagger
 * components:
 *    schemas:
 *       Product:
 *          type: object
 *          properties:
 *             id:
 *                type: Integer
 *                format: Int
 *                description: El id es Autoincremental
 *             title:
 *                type: String 
 *                format: String
 *                description: Titulo del producto
 *             description:
 *                type: String
 *                format: String
 *                description: Detalle del producto
 *             price:
 *                type: Double
 *                format: Double
 *                description: Precio del producto
 *          example:
 *             id: 1
 *             title: Silla nueva
 *             desciption: Esto es nuevo de ecolor verde
 *             price: 20.90
 */

//Return all  products
/** 
 * @swagger
 *  /products:
 *    get:
 *       tags: [Producto]
 *       summary: Mostrar todo los productos
 *       responses:
 *          200:
 *             description: Todo los productos
*/
router.get('/products', async (req, res)=>{
   const products = await Product.findAll();
   res.json(products)
})

//Create new api product
/**
 * @swagger
 * /product:
 *    post:
 *       summary: Crear nuevo producto
 *       tags: [Producto]
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Product'
 *       responses:
 *          200:
 *            description: Producto guardado correctamente
 * 
 */
router.post('/product', async (req, res)=>{
   const {
      title,
      description,
      price
   } = req.body
   const product = await Product.create({title: title, description: description, price:price})
   .then(()=>{
      res.status(200).json(
         {
            message: "successfull",
            product: product
         }
      )
   })
   .catch((err)=>{
      res.status(404).json({
         message: err
      })
   })
})

/**
 * @swagger
 * /product/{id}:
 *    put:
 *       summary: Actualizar Producto
 *       tags: [Producto]
 *       parameters:
 *       - name: id
 *         in: path
 *         schema:
 *          type: integer
 *          format: int
 *         required: true
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Product'
 *       responses:
 *          200:
 *            description: Producto Actualizado
 *            content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *  
 *       
 */
router.put('/product/:id', async (req, res)=>{
   const id = req.params.id
   const  {
      title,
      description,
      price
   } = req.body
   await Product.update({title, description, price}, {where: {id:id}}).then(()=>{
      res.json(
         {
            message: 'update successfull'
         }
      )
   })
})

/**
 * @swagger
 * /product/{id}:
 *    get:
 *       tags: [Producto]
 *       summary: Obtner producto por Id
 *       parameters:
 *       - name: id
 *         in: path
 *         schema:
 *          type: integer
 *          format: int
 *         required: true
 *         description: Producto Id
 *       responses:
 *          200:
 *             description: OK
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *             description: No hay producto
 */
router.get('/product/:id', async(req, res)=>{
   const id = req.params.id
   const product = await Product.findOne({where:{id:id}})
   res.json(product);
})

/**
 * @swagger
 * /product/{id}:
 *    delete:
 *       tags: [Producto]
 *       parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *             type: integer
 *             format: int
 *       responses:
 *          200:
 *             description: Producto eliminado correctamente
 *          404:
 *             description: El producto no se elimino de forma correcta
 */
router.delete('/product/:id', async(req,res)=>{
   const id = req.params.id
   await Product.destroy({where: {id:id}}).then(()=>{res.json({message:"delete successfull"})}).catch((err)=>{res.json({message:err})})
})

module.exports = router 