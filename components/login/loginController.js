const { Router } = require('express');
const router = new Router();

module.exports = (app) => {
    app.use('/login', router)

    router.get('/', (req, res) => {
        res.render('login')

})
    router.post('/', (req, res) => {
        const name = req.body.name;
        if(!name || !name.length){
            res.status(400).json({error: 'No se envo el nombre'});
            return;
        }
        res.session.name = name;
        res.redirect('/');
    })

}