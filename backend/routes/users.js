var express = require('express');
const  categoryController  = require('../controllers/categoryControllers');
const zoneController = require('../controllers/zoneController');
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


module.exports = router;
