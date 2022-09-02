const OrderService = require('../services/Order.service');

const getOrders = async(req, res)=>{

    console.log(`getORders!`);

    const orderService = new OrderService();

    //get orders by user id.

    const userId = req.user._id;

    const orders = await orderService.getOrdersByUser(userId);

    res.render('orders',{
        orders,
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email 
    });

}

const getAllOrders = (req, res)=>{
    
    console.log(`Admin orders, all orders!`);

    res.render('orders',{
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email 
    });

}

module.exports = { getOrders, getAllOrders }