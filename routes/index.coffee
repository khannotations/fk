#
# GET home page.
# 
exports.index = (req, res) ->
  res.render "index",
    title: "Rafi Khan"

exports.work = (req, res) ->
  res.render "work",
    title: "Rafi Khan | Porfolio"

exports.play = (req, res) ->
  res.render "play",
    title: "Rafi Khan | Life!"

exports.blog = (req, res) ->
  res.render "blog",
    title: "Rafi Khan | Italia"

exports.academy = (req, res) ->
  res.render "academy",
    title: "Rafi Khan | Academy"

exports.get_blog = (req, res) ->
  res.render "blog_entries",
    layout: false

exports.notes = (req, res) ->
  res.render "notes",
    title: "Rafi Khan | Gimme an Ear"

# Ajax helper for 'Gimme an ear'
exports.getNotes = (req, res) ->
  note1 = Math.ceil(Math.random() * 25)
  note2 = Math.ceil(Math.random() * 25)
  note2 = Math.ceil(Math.random() * 25)  while note2 is note1
  diff = Math.abs(note1 - note2)
  if note1 > note2 # Always put lower note on left
    res.render "getNotes",
      layout: false
      one: note2
      two: note1
      diff: diff

  else
    res.render "getNotes",
      layout: false
      one: note1
      two: note2
      diff: diff


exports.post = (req, res) ->
  res.render "post",
    title: "Post success!"



# Deprecated intro page
exports.intro = (req, res) ->
  SIZE = 50
  width = (100 / SIZE) # As percentages
  height = (100 / SIZE)
  dim = new Array(SIZE) # Annoying, but couldn't think of
  i = 0 # another way to interate in Jade

  while i < SIZE
    dim[i] = i
    i++
  res.render "intro",
    title: "Call Me Rafi"
    dims: dim
    wid: width
    hei: height


exports.notFound = (req, res) ->
  res.render "notFound", #, layout: false});
    title: "Oops"
