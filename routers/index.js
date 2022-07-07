const productTestController = require('../components/productTest/productTestController');
const loginController = require('../components/login/loginController');
const isLoggedIn = require('../utils/isLoggedIn');
module.exports = (app) => {
    productTestController(app);
    loginController(app);

    app.get('/', isLoggedIn, (res, req) => {
        res.render('index', {name: req.session.name});
    });

    app.get('/logout', (req, res) => {
        const name = req.session.name;
        req.session.destroy();
        res.render('logout', {name});
    });

    app.get('*', (req, res) => {
        res.status(404).json({
            error: -2,
            description: ` ruta ${req.originalUrl} no encontrada`
        });
    });
}