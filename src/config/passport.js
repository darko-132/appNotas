const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {mesage: 'Not user found.'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorret password'})
        }
    }
}));
/* mantiene la sesion */
passport.serializeUser((user, done)=>{
    done(null, user.id); 
    console.log(user.id)
});
 /* obtiene los datos del usuario */
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
})

