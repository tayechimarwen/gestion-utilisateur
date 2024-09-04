const express = require('express')
const app = express()
const port = 2000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const allRoutes = require('./routes/allRoutes')
const addUserRoute = require('./routes/addUser')




// lien de  connection avec la base des données mongodb
mongoose.connect('mongodb+srv://tayechimarwen81:Gp3aE77Iq706b47f@cluster0.onro6do.mongodb.net/all-donnees?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

  }).catch((err) => {
    console.log(err);
  });


//les codes pour auto refreche
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(allRoutes)
app.use("/user/add.html",addUserRoute)
