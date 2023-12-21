const mongoose = require('mongoose');

const shopschema = new mongoose.Schema({
    AddressLine: { type: String, required: true },
    BusinessDisplayName: { type: String ,required: true }, // We'll set this using custom logic
    BusinessRouteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    Category:{type : String,required: true },
    City:{type : String,required: true },
    CloseTime:{type : String,required: true },
    companyName:{type : String,required: true },
    companyType:{type : String,required: true },
    Country:{type : String,required: true },
    CountryCode:{type : String,required: true },
    gstNumber:{type : String },
    lastEditedBy:{type : String },
    latitude:{type : String },
    longitude:{type : String },
    openTime:{type : String },
    primaryPhoneNumber:{type : Number,match: /^[0-9]{10}$/},
    RouteSerialNumber:{type : Number},
    typedAddress:{type : String },
    zipCode:{type : Number,required: true }

    // Add other fields as needed
});

const userSchema = new mongoose.Schema({
    accessLeval: { type: Number, required: true},
    admin: { type: Boolean }, // We'll set this using custom logic
    applicableRoutes: {
        type: Array,
        routeid: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true }
    },
    local: { type: Boolean },
    password: { type: String },
    shopOwner: { type: Boolean },
    userMail: { type: String, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    userName: { type: String },
    userPhone: { type: String, match: /^[0-9]{10}$/ }
    // Add other fields as needed
});

const productSchema = new mongoose.Schema({
    cartoonPacking: { type: Boolean, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
    cgst: { type: Number, required: true },
    comments: { type: String },
    displayImage: { type: String },
    hsnCode: { type: String, required: true },
    piece: { type: Number, required: true },
    pieceCtn: { type: Number, required: true },
    productCode: { type: String, required: true },
    productDescription: { type: String, required: true },
    productName: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    sgst: { type: Number, required: true },
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true }],
    totalPrice: { type: Number, required: true }
    // Add other fields as needed
});

const orderItemSchema = new mongoose.Schema({
    cartoonPacking: { type: Boolean, required: true },
    comments: { type: String },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    piece: { type: Number, required: true },
    pieceCtn: { type: Number, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true }
    // Add other fields as needed
});

const orderSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    fakeLocation: { type: Boolean, required: true },
    gotOrder: { type: Boolean, required: true },
    id: { type: String, required: true },
    items: [orderItemSchema],
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    orderStatus: { type: String, required: true },
    salesmanName: { type: String, required: true },
    selfOrder: { type: Boolean, required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    shopLatitude: { type: Number, required: true },
    shopLongitude: { type: Number, required: true },
    shopName: { type: String, required: true },
    shopOpen: { type: Boolean, required: true }
    // Add other fields as needed
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const Order = mongoose.model('Order', orderSchema);
const product = mongoose.model('Product', productSchema);
const shop = mongoose.model('Shop', shopschema);
const user = mongoose.model('User', userSchema);


module.exports = { shop ,user,product,OrderItem,Order};