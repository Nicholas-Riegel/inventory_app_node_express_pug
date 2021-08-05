const { Router } = require('express')
const router = Router()
const CategoryModel = require('../models/category')
const ProductModel = require('../models/product')

// get all categories
router.get('/', async (req, res) => {
    try {
        const catList = await CategoryModel.find({}).sort({name: 1})
        res.render('index', { title: 'Categories', catList })
    } catch (err) {
        console.log(err)
    }
})

// get new category page
router.get('/category/new', (req, res) => {
    res.render('new_category')    
})

// post new category
router.post('/category', async (req, res) => {

    let x = req.body.newCatName.toLowerCase()
    x = x.charAt(0).toUpperCase() + x.slice(1)
    
    const newCat = new CategoryModel({ name: x })
    
    try {
        await newCat.save()
        res.redirect('/')
        console.log('New category added')
    } catch (err) {
        console.log(err)
    }
})

// get particular category
router.get('/category/:idx', async (req, res) => {
    try {
        const cat = await CategoryModel.findById(req.params.idx)
        const prodList = await ProductModel.find({categoryId: req.params.idx}).sort({name:1})
        res.render('category_detail', { cat, prodList })
    } catch (err) {
        console.log(err)
    }
})

// get edit category page
router.get('/category/edit/:idx', async (req, res) => {
    try {
        const catToEdit = await CategoryModel.findById(req.params.idx)
        res.render('edit_category', {catToEdit})
    } catch (err) {
        console.log(err)
    }
})

// submit edits
router.post('/category/edit/:idx', async (req, res) => {
    try {
        await CategoryModel.findByIdAndUpdate(req.params.idx, { name: req.body.editedCat })
        res.redirect('/category/' + req.params.idx)
    } catch (err) {
        console.log(err)
    }
})

// delete category
router.get('/category/delete/:idx', async (req, res) => {
    try {
        const prodList = await ProductModel.find({categoryId: req.params.idx})
        if (prodList.length < 1) {
            await CategoryModel.findByIdAndDelete(req.params.idx)
            res.redirect('/')
        } else {
            const cat = await CategoryModel.findById(req.params.idx)
            res.render('category_detail', { cat, prodList, cat_message: 'All products in category must be deleted prior to deleting category.' })
        }
    } catch (err) {
        console.log(err)
    }
})

// PRODUCTS

// get new product page
router.get('/category/:catId/new_product', async (req, res) => {
    try {
        const cat = await CategoryModel.findById(req.params.catId)
        res.render('new_product', { cat })
    } catch (err) {
        console.log(err)
    }
})

// post new product
router.post('/category/:catId/new_product', async (req, res) => {

    let x = req.body.newProdName.toLowerCase()
    x = x.charAt(0).toUpperCase() + x.slice(1)
    
    const newProd = new ProductModel({
        name: x,
        description: req.body.newProdDescription,
        categoryId: req.params.catId,
        price: req.body.newProdPrice,
        quantity: req.body.newProdQuantity
    })
    
    try {
        await newProd.save()
        res.redirect('/category/'+req.params.catId)
        console.log('New product added')
    } catch (err) {
        console.log(err)
    }
})

// get particular product
// router.get('/category/:catId/product/:prodId', async (req, res) => {
//     try {
//         const cat = await CategoryModel.findById(req.params.catId)
//         const prod = await ProductModel.findById(req.params.prodId)
//         res.render('product_detail', { cat, prod })
//     } catch (err) {
//         console.log(err)
//     }
// })

// get edit product page
router.get('/category/:catId/product/:prodId/edit', async (req, res) => {
    try {
        const cat = await CategoryModel.findById(req.params.catId)
        const prod = await ProductModel.findById(req.params.prodId)
        res.render('edit_product', {cat, prod})
    } catch (err) {
        console.log(err)
    }
})

// submit product edits
router.post('/category/:catId/product/:prodId/edit', async (req, res) => {
    try {
        await ProductModel.findByIdAndUpdate(req.params.prodId,
            {
                name: req.body.prodName,
                description: req.body.prodDescription,
                price: req.body.prodPrice,
                quantity: req.body.prodQuantity
            })
        res.redirect('/category/'+req.params.catId)
    } catch (err) {
        console.log(err)
    }
})

// delete product
router.get('/category/:catId/product/:prodId/delete', async (req, res) => {
    try {
        const prod = await ProductModel.findById(req.params.prodId)
        if (prod.quantity < 1) {
            await ProductModel.findByIdAndDelete(req.params.prodId)
            res.redirect('/category/'+req.params.catId)
        } else {
            const cat = await CategoryModel.findById(req.params.catId)
            const prodList = await ProductModel.find({categoryId: req.params.catId}).sort({name:1})
            res.render('category_detail', { prodList, cat, prod_message: 'Product quantity must be zero before product can be deleted.'})
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router