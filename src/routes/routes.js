const usercontroller = require('../controllers/UserControllers');

module.exports = [
    {endpoint: "/users", method: "GET", handler: usercontroller.listUsers, },   
    {endpoint: "/users/:id", method: "GET", handler: usercontroller.getUserById, },  
    {endpoint: "/users", method: "POST", handler: usercontroller.CreateUser, },  
    {endpoint: "/users/:id", method: "PUT", handler: usercontroller.upgradeUser, },  
    {endpoint: "/users/:id", method: "DELETE", handler: usercontroller.deleteuser, },  
    ]