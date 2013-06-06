express = require('express')
routes = require('./routes')
sass = require('node-sass')

pub = __dirname + '/public'

app = module.exports = express.createServer()

# Configuration
PORT = process.env.PORT or 2999
app.configure ->
  
  #app.use(express.logger());
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.bodyParser()
  
  #app.set('env', 'production');
  app.disable 'view cache'
  app.use express.methodOverride()
  app.use express.cookieParser()
  myDate = new Date()
  myDate.setDate myDate.getDate() + 365
  app.use express.session(
    page: 'none'
    secret: 'CmRp'
    cookie:
      expires: myDate
  )
  app.use(sass.middleware(
    src: pub + '/stylesheets'
    dest: pub # Don't change this -- it doesn't work for some reason otherwise.
    debug: true
  ))
  app.use express.static(pub)
  app.use app.router

app.configure 'development', ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure 'production', ->
  app.use express.errorHandler()


# Routes
app.get '/', routes.index
app.get '/portfolio', routes.work
app.get '/life', routes.play
app.get '/italia', routes.blog
app.get '/academy', routes.academy
app.get '/get_blog', routes.get_blog

#app.get('/intro', routes.intro);
app.get '/notes', routes.notes
app.get '/getNotes', routes.getNotes
app.post '/', routes.post

# Catcher
app.get '*', routes.notFound
app.post '*', routes.notFound
app.listen PORT

# console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
