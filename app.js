/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , pub = __dirname + "/public";
  //, lessErrorHandler = require ('./lib/less_errors.js');

var app = module.exports = express.createServer();
// Configuration

var PORT = process.env.PORT || 2999;
app.configure(function(){
  //app.use(express.logger());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  //app.set('env', 'production');
  app.disable('view cache');
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  var myDate=new Date();
  myDate.setDate(myDate.getDate()+365);
  app.use(express.session({
    page: "none",
    secret: "CmRp",
    cookie: {expires: myDate}
  }));
  app.use(require('connect-less')({ src: pub}));
  //app.use(express.compiler({ src:pub, enable: ['less'] }));

  //app.use(lessErrorHandler);

  app.use(express.static(pub));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/portfolio', routes.index);
app.get('/thelife', routes.index);
app.get('/italia', routes.index);
app.get('/christina', routes.index);



//app.get('/intro', routes.intro);
app.get('/notes', routes.notes);
app.get('/getNotes', routes.getNotes);

app.post('/', routes.post);

// Catcher
app.get('*', routes.notFound);
app.post('*', routes.notFound);

app.listen(PORT);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
