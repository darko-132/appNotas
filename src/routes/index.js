//Renderiza hbs

const router =  require('express').Router(); /* herramientra para renderizar */

router.get('/', (req, res) =>{ //renderiza index.hbs y lo muestra en pantalla
    res.render('index')
});
router.get('/about', (req, res)=> {//renderiza about.hbs y lo muestra en pantalla
    res.render('about');
});
module.exports = router;