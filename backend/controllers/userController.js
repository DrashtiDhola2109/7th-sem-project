const {shop ,user,product,OrderItem,Order} =require('../models/userSchema');
const { Category, Subcategory } = require('../models/categorySchema');

const createShop = async (req, res) => {
    try {
        const {
            AddressLine,BusinessDisplayName,BusinessRouteId,Category,City,CloseTime,companyName,companyType,
            Country,CountryCode,gstNumber,lastEditedBy,latitude,longitude,openTime,primaryPhoneNumber,RouteSerialNumber,
            typedAddress,zipCode} = req.body;

        const newShop = new shop({
            AddressLine,BusinessDisplayName,BusinessRouteId,Category,City,CloseTime,companyName,companyType,
            Country,CountryCode,gstNumber,lastEditedBy,latitude,longitude,openTime,primaryPhoneNumber,RouteSerialNumber,
            typedAddress,zipCode
        });

        await newShop.save();

        console.log("Shop added successfully!");
        res.status(201).json({
            Data: { newShop },
            Result: { Code: 201, Message: "Shop added successfully!", Cause: null }
        });
    } catch (error) {
        console.error("Could not add shop:", error.message);
        res.status(500).json({ Error: "Could not add shop" });
    }
};

async function deleteShop(req, res) {
    const shopId = req.params.id;

    await shop.findByIdAndDelete(shopId)
        .then((deletedShop) => {
            if (!deletedShop) {
                return res.status(404).json({ error: 'Shop not found' });
            }

            console.log("Shop deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "Shop deleted successfully!", Cause: null } });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete shop' });
        });
}

async function getShops(req, res) {
    try {
        const shopData = await shop.find();

        if (!shopData || shopData.length === 0) {
            return res.status(404).json({ error: 'No shops found' });
        }

        res.status(200).json(shopData);
    } catch (error) {
        console.error('Error fetching shops:', error);
        res.status(500).json({ error: 'Could not fetch shops' });
    }
}


async function updateShop(req, res) {
    const shopId = req.params.id;
    const {
        AddressLine,
        BusinessDisplayName,
        BusinessRouteId,
        Category,
        City,
        CloseTime,
        companyName,
        companyType,
        Country,
        CountryCode,
        gstNumber,
        lastEditedBy,
        latitude,
        longitude,
        openTime,
        primaryPhoneNumber,
        RouteSerialNumber,
        typedAddress,
        zipCode
    } = req.body;

    try {
        const updatedShop = await shop.findByIdAndUpdate(
            shopId,
            {
                AddressLine,
                BusinessDisplayName,
                BusinessRouteId,
                Category,
                City,
                CloseTime,
                companyName,
                companyType,
                Country,
                CountryCode,
                gstNumber,
                lastEditedBy,
                latitude,
                longitude,
                openTime,
                primaryPhoneNumber,
                RouteSerialNumber,
                typedAddress,
                zipCode
            },
            { new: true } // This option returns the updated shop
        );

        if (!updatedShop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.status(200).json({
            Data: { updatedShop },
            Result: { Code: 200, Message: 'Shop updated successfully!', Cause: null },
        });
    } catch (error) {
        console.error('Could not update shop:', error);
        res.status(500).json({ error: 'Could not update shop' });
    }
}

//user


async function createUser(req, res) {
    try {
        const {
            accessLeval,
            admin,
            applicableRoutes,
            local,
            password,
            shopOwner,
            userMail,
            userName,
            userPhone
        } = req.body;

        const newUser = new user({
            accessLeval,
            admin,
            applicableRoutes,
            local,
            password,
            shopOwner,
            userMail,
            userName,
            userPhone
        });

        await newUser.save();

        console.log("User added successfully!");
        res.status(201).json({
            Data: { newUser },
            Result: { Code: 201, Message: "User added successfully!", Cause: null }
        });
    } catch (error) {
        console.error("Could not add user:", error.message);
        res.status(500).json({ Error: "Could not add user" });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;

    await user.findByIdAndDelete(userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            console.log("User deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "User deleted successfully!", Cause: null } });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete user' });
        });
}

async function getUsers(req, res) {
    try {
        const userData = await user.find();

        if (!userData || userData.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Could not fetch users' });
    }
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const {
        accessLevel,
        admin,
        applicableRoutes,
        local,
        password,
        shopOwner,
        userMail,
        userName,
        userPhone
    } = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            {
                accessLevel,
                admin,
                applicableRoutes,
                local,
                password,
                shopOwner,
                userMail,
                userName,
                userPhone
            },
            { new: true } // This option returns the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            Data: { updatedUser },
            Result: { Code: 200, Message: 'User updated successfully!', Cause: null },
        });
    } catch (error) {
        console.error('Could not update user:', error);
        res.status(500).json({ error: 'Could not update user' });
    }
}

//product


async function createProduct(req, res) {
    try {
        const {
            cartoonPacking,
            categories,
            cgst,
            comments,
            displayImage,
            hsnCode,
            piece,
            pieceCtn,
            productCode,
            productDescription,
            productName,
            sellingPrice,
            sgst,
            subCategories,
            totalPrice
        } = req.body;

        // Assuming you have a Category name in the request body
        const categoryName = req.body.categoryName;

        // Find the category by name
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Assuming subCategories array contains subcategory names
        const subCategoryNames = req.body.subCategories;

        // Find subcategories by names
        const foundSubcategories = await Subcategory.find({ name: { $in: subCategoryNames } });

        if (foundSubcategories.length !== subCategoryNames.length) {
            return res.status(404).json({ error: 'One or more subcategories not found' });
        }

        // Create the product with the found category and subcategories
        const newProduct = new product({
            cartoonPacking,
            categories: [category._id],
            cgst,
            comments,
            displayImage,
            hsnCode,
            piece,
            pieceCtn,
            productCode,
            productDescription,
            productName,
            sellingPrice,
            sgst,
            subCategories: foundSubcategories.map(subcategory => subcategory._id),
            totalPrice
        });

        await newProduct.save();

        console.log("Product added successfully!");
        res.status(201).json({
            Data: { newProduct },
            Result: { Code: 201, Message: "Product added successfully!", Cause: null }
        });
    } catch (error) {
        console.error("Could not add product:", error.message);
        res.status(500).json({ Error: "Could not add product" });
    }
}

async function deleteProduct(req, res) {
    const productId = req.params.id;

    await product.findByIdAndDelete(productId)
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            console.log("Product deleted successfully!!!");
            res.status(200).json({ Result: { Code: 200, Message: "Product deleted successfully!", Cause: null } });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Could not delete product' });
        });
}


async function getProducts(req, res) {
    try {
        const products = await product.find()
            .populate('categories')
            .populate('subCategories');

        if (!products) {
            return res.status(404).json({ error: 'No products found' });
        }

        // Map the products to replace category and subcategory IDs with their respective names
        const productsWithRelativeData = products.map(product => {
            return {
                _id: product._id,
                cartoonPacking: product.cartoonPacking,
                categories: product.categories.map(category => category.name),
                cgst: product.cgst,
                comments: product.comments,
                displayImage: product.displayImage,
                hsnCode: product.hsnCode,
                piece: product.piece,
                pieceCtn: product.pieceCtn,
                productCode: product.productCode,
                productDescription: product.productDescription,
                productName: product.productName,
                sellingPrice: product.sellingPrice,
                sgst: product.sgst,
                subCategories: product.subCategories.map(subcategory => subcategory.name),
                totalPrice: product.totalPrice
                // Add other fields as needed
            };
        });

        res.status(200).json(productsWithRelativeData);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Could not fetch products' });
    }
}


async function updateProduct(req, res) {
    const productId = req.params.id;
    const {
        cartoonPacking,
        categories,
        cgst,
        comments,
        displayImage,
        hsnCode,
        piece,
        pieceCtn,
        productCode,
        productDescription,
        productName,
        sellingPrice,
        sgst,
        subCategories,
        totalPrice
    } = req.body;

    try {
        // Find the product by ID
        const subCategoryNames = req.body.subCategories;
        const existingProduct = await product.findById(productId);
        const subCategoryIds = await Subcategory.find({ name: { $in: subCategoryNames } }, '_id');
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update product fields
        existingProduct.cartoonPacking = cartoonPacking;
        existingProduct.categories = categories; // Assuming you provide an array of category IDs
        existingProduct.cgst = cgst;
        existingProduct.comments = comments;
        existingProduct.displayImage = displayImage;
        existingProduct.hsnCode = hsnCode;
        existingProduct.piece = piece;
        existingProduct.pieceCtn = pieceCtn;
        existingProduct.productCode = productCode;
        existingProduct.productDescription = productDescription;
        existingProduct.productName = productName;
        existingProduct.sellingPrice = sellingPrice;
        existingProduct.sgst = sgst;
        existingProduct.subCategories = subCategoryIds.map(subCategory => subCategory._id);; // Assuming you provide an array of subcategory IDs
        existingProduct.totalPrice = totalPrice;

        // Save the updated product
        await existingProduct.save();

        console.log("Product updated successfully!");
        res.status(200).json({
            Data: { updatedProduct: existingProduct },
            Result: { Code: 200, Message: "Product updated successfully!", Cause: null }
        });
    } catch (error) {
        console.error("Could not update product:", error.message);
        res.status(500).json({ Error: "Could not update product" });
    }
}

// Order Item Controller Functions

// Create Order Item
async function createOrderItem(req, res) {
    const { cartoonPacking, comments, orderId, piece, pieceCtn, productId, productName } = req.body;
    
    try {
        const newOrderItem = new OrderItem({ cartoonPacking, comments, orderId, piece, pieceCtn, productId, productName });
        await newOrderItem.save();

        res.status(201).json({
            Data: { newOrderItem },
            Result: { Code: 201, Message: "Order item created successfully!", Cause: null }
        });
    } catch (error) {
        console.error('Could not create order item:', error);
        res.status(500).json({ error: 'Could not create order item' });
    }
}

// Delete Order Item
async function deleteOrderItem(req, res) {
    const orderItemId = req.params.id;

    try {
        const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);

        if (!deletedOrderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        console.log("Order item deleted successfully!!!");
        res.status(200).json({ Result: { Code: 200, Message: "Order item deleted successfully!", Cause: null } });
    } catch (error) {
        console.error('Could not delete order item:', error);
        res.status(500).json({ error: 'Could not delete order item' });
    }
}

// Get All Order Items
async function getAllOrderItems(req, res) {
    try {
        const orderItems = await OrderItem.find();

        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({ error: 'No order items found' });
        }

        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching order items:', error);
        res.status(500).json({ error: 'Could not fetch order items' });
    }
}

// Order Controller Functions

// Create Order
async function createOrder(req, res) {
    const {
        date, fakeLocation, gotOrder, id, items, latitude, longitude,
        orderStatus, salesmanName, selfOrder, shopId, shopLatitude,
        shopLongitude, shopName, shopOpen
    } = req.body;

    try {
        const newOrder = new Order({
            date, fakeLocation, gotOrder, id, items, latitude, longitude,
            orderStatus, salesmanName, selfOrder, shopId, shopLatitude,
            shopLongitude, shopName, shopOpen
        });
        await newOrder.save();

        res.status(201).json({
            Data: { newOrder },
            Result: { Code: 201, Message: "Order created successfully!", Cause: null }
        });
    } catch (error) {
        console.error('Could not create order:', error);
        res.status(500).json({ error: 'Could not create order' });
    }
}

// Delete Order
async function deleteOrder(req, res) {
    const orderId = req.params.id;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        console.log("Order deleted successfully!!!");
        res.status(200).json({ Result: { Code: 200, Message: "Order deleted successfully!", Cause: null } });
    } catch (error) {
        console.error('Could not delete order:', error);
        res.status(500).json({ error: 'Could not delete order' });
    }
}

// Get All Orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Could not fetch orders' });
    }
}

// Update Order
async function updateOrder(req, res) {
    const orderId = req.params.id;
    const { date, fakeLocation, gotOrder, items, latitude, longitude,
        orderStatus, salesmanName, selfOrder, shopId, shopLatitude,
        shopLongitude, shopName, shopOpen } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                date, fakeLocation, gotOrder, items, latitude, longitude,
                orderStatus, salesmanName, selfOrder, shopId, shopLatitude,
                shopLongitude, shopName, shopOpen
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            Data: { updatedOrder },
            Result: { Code: 200, Message: 'Order updated successfully!', Cause: null },
        });
    } catch (error) {
        console.error('Could not update order:', error);
        res.status(500).json({ error: 'Could not update order' });
    }
}

// ...




module.exports = { createShop, deleteShop, getShops, updateShop ,createUser, deleteUser, getUsers, updateUser,createProduct, deleteProduct, getProducts, updateProduct,createOrderItem,
    deleteOrderItem,
    getAllOrderItems,
    createOrder,
    deleteOrder,
    getAllOrders,
    updateOrder};
