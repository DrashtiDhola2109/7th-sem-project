const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    displayName: { type: String, required: true, unique: true },
    displayOrder: { type: Number }, // We'll set this using custom logic
    name: { type: String, required: true }
    // Add other fields as needed
});

categorySchema.pre('save', async function (next) {
    if (!this.displayOrder) {
        try {
            const lastCategory = await Category.findOne({}, {}, { sort: { displayOrder: -1 } });
            this.displayOrder = (lastCategory && lastCategory.displayOrder) || 0;
            this.displayOrder++; // Increment the value for the new category
        } catch (error) {
            console.error('Error getting last category:', error);
        }
    }
    next();
});

const subcategorySchema = new mongoose.Schema({
    displayName: { type: String, required: true, unique: true },
    displayOrder: { type: Number },
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true, unique: true}
    // Other subcategory fields
});

subcategorySchema.pre('save', async function (next) {
    if (!this.displayOrder) {
        try {
            const lastCategory = await Subcategory.findOne({}, {}, { sort: { displayOrder: -1 } });
            this.displayOrder = (lastCategory && lastCategory.displayOrder) || 0;
            this.displayOrder++; // Increment the value for the new category    
        } catch (error) {
            console.error('Error getting last category:', error);
        }
    }
    next();
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category,  Subcategory };
