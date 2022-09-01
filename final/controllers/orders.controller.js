const getOrders = (req, res)=>{

    console.log(`getORders!`);

    res.render('orders',{
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