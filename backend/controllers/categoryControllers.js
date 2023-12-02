const { Category, Subcategory } = require('../models/categorySchema');


// category functions

//creation
async function createCategory(req, res) {
    const displayName = req.body.displayName, name = req.body.name;
    const newCategory = new Category({ displayName, name });
    await newCategory.save()
        .then(() => {
            console.log("category created successfully!!!");
            res.status(201).json({ Data: { newCategory }, Result: { Code: 201, Message: "Category created successfully!", Cause: null } });
        })
        .catch((error) => {
            console.log("could not create category" + " " + error.message);
            res.status(500).json({ Error: "Could not create category" });

        })

}

//deletion
async function deleteCategory(req, res) {
    const cId = req.params.id;
    console.log(cId);
    await Category.findByIdAndDelete(cId)
        .then((deletedCategory) => {
            if (!deletedCategory) {
                // Category with the given ID was not found
                return res.status(404).json({ error: 'Category not found' });
            }


            console.log("category deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "Category deleted successfully!", Cause: null } });


        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete category' });

        })
}


//fetching all the categories
async function getAllCategories(req, res) {
    try {
        const categories = await Category.find(); // Assuming you're using Mongoose

        if (!categories) {
            return res.status(404).json({ error: 'No categories found' });
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Could not fetch categories' });
    }
}

//edit category

async function updateCategory(req, res) {
    const cId = req.params.id;
    const { displayName, name } = req.body;
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        cId,
        { displayName, name },
        { new: true } // This option returns the updated category
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json({
        Data: { updatedCategory },
        Result: { Code: 200, Message: 'Category updated successfully!', Cause: null },
      });
    } catch (error) {
      console.error('Could not update category:', error);
      res.status(500).json({ error: 'Could not update category' });
    }
  }


//subcategory functions

async function createSubCategory(req, res) {
    Category.findOne({ name: req.body.categoryName })
        .then(category => {
            if (!category) {
                res.json('Category not found');
            }
            else {
                const displayName = req.body.displayName, name = req.body.name;
                const newSubCategory = new Subcategory({ displayName, categoryID: category._id, name });
                newSubCategory.save();
                res.status(201).json({ Data: { newSubCategory }, Result: { Code: 201, Message: "Subcategory created successfully!", Cause: null } });
            }
        })
        .catch(error => {
            console.error('could not create category' + " " + error.message);
        });
}

//deletion of subcategory

async function deleteSubCategory(req, res) {
    const scId = req.params.id;
    console.log(scId);
    await Subcategory.findByIdAndDelete(scId)
        .then((deletedSubCategory) => {
            if (!deletedSubCategory) {
                // Category with the given ID was not found
                return res.status(404).json({ error: 'Subcategory not found' });
            }


            console.log("Subcategory deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "Subcategory deleted successfully!", Cause: null } });


        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete subcategory' });

        })
}



// ...

async function getAllSubcategories(req, res) {
    try {
        const subcategories = await Subcategory.find().populate('categoryID'); // Populate the 'categoryID' field

        if (!subcategories) {
            return res.status(404).json({ error: 'No subcategories found' });
        }

        // Now, map the subcategories to replace categoryID with the relative category name
        const subcategoriesWithRelativeCategory = subcategories.map(subcategory => {
            return {
                _id: subcategory._id,
                displayName: subcategory.displayName,
                name: subcategory.name,
                categoryName: subcategory.categoryID.name // Use 'categoryID' to access the populated category data
            };
        });

        res.status(200).json(subcategoriesWithRelativeCategory);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Could not fetch subcategories' });
    }
}


// Update subcategory
async function updateSubcategory(req, res) {
    const scId = req.params.id;
    const { displayName, name, categoryName } = req.body;

    try {
        // Find the corresponding Category document by categoryName
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }                                                             

        // Update the Subcategory with the new values and categoryId
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            scId,
            { displayName, name, categoryID : category._id }, // Update categoryId
            { new: true } // This option returns the updated subcategory
        );

        if (!updatedSubcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        // Include categoryName in the response
        const responseData = {
            updatedSubcategory,
            categoryName, // Include the categoryName in the response
        };


        res.status(200).json({
            Data: responseData,
            Result: { Code: 200, Message: 'Subcategory updated successfully!', Cause: null },
        });
    } catch (error) {
        console.error('Could not update subcategory:', error);
        res.status(500).json({ error: 'Could not update subcategory' });
    }
}






module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
    createSubCategory,
    deleteSubCategory,
    getAllSubcategories, // Add the new controller function for getting all subcategories
    updateSubcategory // Add the new controller function for updating subcategories
};


