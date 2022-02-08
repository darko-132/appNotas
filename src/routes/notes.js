//Renderiza hbs

const router =  require('express').Router(); /* herramientra para renderizar */
const Note = require('../models/Note'); /* Direccion de base de datos*/
const {isAuthenticated}=require ('../helpers/auth');
const passport = require('passport');

router.get('/notes/add', isAuthenticated, (req, res)=>{ /* cuando la url sea /notes/add renderia el new-notes.hbs */
    res.render('notes/new-notes')
});
router.post('/notes/new-notes', isAuthenticated , async (req, res)=>{ /* cuando se este mostrando /notes/new-notes.hbs muetra mensaje base de datos, como se interectua a bd debe ser async */
    const { title, description } = req.body; /* crea una costande llamada title y description y trae el valor desde body */
    const errors = []; /* array vacio para guardar mensajes */
    if(!title){ /* si title esta vacio */
        errors.push({text: 'Porfavor escriba un titulo'}); /* envia text al array errors */
    };

    if(!description){/* si description esta vacio */
        errors.push({text: 'Porfavor escriba una descripcion'}); /* envia text al array errors */
    };
    if(errors.length > 0){ /* comprueba si hay mensajes de errors */
        res.render('notes/new-notes', { /* renderiza mensajes */
            errors,
            title,
            description
        });
    }
    else{
        const newNote = new Note({ title, description});/* si todos los datos estan correctos, llama titulo, description desde bd*/
        await newNote.save() /* El save()método devuelve una promesa. Si save()tiene éxito, la promesa se resuelve en el documento que se guardó. */
        console.log(newNote) /* Imprime el valor de newnote */
        req.flash('success_msg', 'Note added successfully') /* muetra un mensaje de nota agragada */
        res.redirect('/notes') /* redirecciona a /notes */
        
    };
  
    
});

router.get('/notes', isAuthenticated, async(req, res)=>{
    const notes = await Note.find().sort({date: 'desc'}).lean() /* find: trae los collection, sort ordena por fecha de mas nuevo a mas viejo, lean: convieste en json para se mas facil para js */
    res.render('notes/all-notes', { notes }); /* muestra en pantalla la el cons notes */
});

router.get('/notes/edit/:id',isAuthenticated, async (req, res)=>{/* cuando la url sea /notes/edit/:id */
    const note = await Note.findById(req.params.id).lean(); /* se obtine la id del parametro */
    res.render('notes/edit-notes', {note}); /* se muestra en pantalla edit-notes.hbs con el parametro note */
});

router.put('/notes/edit-notes/:id', isAuthenticated,  async (req, res)=>{/* PUT crea un nuevo elemento o reemplaza una representación del elemento de destino con los datos de la petición. */
    const { title, description } = req.body; /* trae title y descrition desde db */
    await Note.findByIdAndUpdate(req.params.id, {title , description}); /*findByIdAndUpdate: actualiza los datos desde db */
    req.flash('success_msg', 'Note update successfully')
    res.redirect('/notes'); /* redirecciona a la pagina de las notas */
});

router.delete('/notes/delete/:id', isAuthenticated,  async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted successfully')
    res.redirect('/notes')
})
module.exports = router;