var express = require('express');
const  categoryController  = require('../controllers/categoryControllers');
const zoneController = require('../controllers/zoneController');
const usercontroller = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addCategory', categoryController.createCategory);
router.post('/addSubCategory', categoryController.createSubCategory);
router.get('/categories',categoryController.getAllCategories);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.delete('/subcategories/:id', categoryController.deleteSubCategory);
router.get('/subcategories',categoryController.getAllSubcategories);
router.put('/subcategories/:id', categoryController.updateSubcategory);

router.post('/addzone', zoneController.createZone);
router.post('/addarea',zoneController.CreateArea);
router.post('/addroute',zoneController.createRoute);
router.get('/zone',zoneController.getZone);
router.get('/area',zoneController.getAllArea);
router.get('/route',zoneController.getAllRoute);
router.put('/zone/:id',zoneController.updateZone);
router.put('/area/:id',zoneController.updatearea);
router.put('/route/:id',zoneController.updateroute);
router.delete('/zone/:id',zoneController.deleteZone);
router.delete('/area/:id',zoneController.deletearea);
router.delete('/route/:id',zoneController.deleteroute);


router.post('/addshop',usercontroller.createShop);
router.delete('/shop/:id',usercontroller.deleteShop);
router.put('/shop/:id',usercontroller.updateShop);
router.get('/shop',usercontroller.getShops);

router.post('/adduser',usercontroller.createUser);
router.delete('/user/:id',usercontroller.deleteUser);
router.put('/user/:id',usercontroller.updateUser);
router.get('/user',usercontroller.getUsers);

router.post('/addproduct',usercontroller.createProduct);
router.delete('/product/:id',usercontroller.deleteProduct);
router.put('/product/:id',usercontroller.updateProduct);
router.get('/product',usercontroller.getProducts);

router.post('/addorderitem',usercontroller.createOrderItem);
router.delete('/orderitem/:id',usercontroller.deleteOrderItem);
router.get('/orderitem',usercontroller.getAllOrderItems);

router.post('/addorder',usercontroller.createOrder);
router.delete('/order/:id',usercontroller.deleteOrder);
router.put('/order/:id',usercontroller.updateOrder);
router.get('/order',usercontroller.getAllOrders);


module.exports = router;
