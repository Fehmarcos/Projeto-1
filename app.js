
const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const cookie = require('cookie-parser');

app.engine('handlebars', handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
    express.urlencoded({
      extended: true
    })
)

app.listen(8081, function(){
        console.log("Servidor no http://localhost:8081")
});