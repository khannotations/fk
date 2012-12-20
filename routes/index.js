/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "Rafi Khan" });
};
exports.work = function(req, res){
  res.render('_work', { title: "Rafi Khan | Porfolio" });
};
exports.play = function(req, res){
  res.render('_play', { title: "Rafi Khan | Life!" });
};
exports.blog = function(req, res){
  res.render('_blog', { title: "Rafi Khan | Italia" });
};
exports.academy = function(req, res){
  res.render('_academy', { title: "Rafi Khan | Academy" });
};

exports.get_blog = function(req, res) {
  res.render('_blog_entries', { layout: false });
};


exports.notes = function(req, res) {
  res.render('notes', { title: 'Gimme an Ear', layout: 'notes_layout' });
};

// Ajax helper for 'Gimme an ear'
exports.getNotes = function(req, res) {
  var note1 = Math.ceil(Math.random()*25);
  var note2 = Math.ceil(Math.random()*25);
  while(note2==note1)
    note2 = Math.ceil(Math.random()*25);
  var diff = Math.abs(note1-note2);
  if(note1>note2) // Always put lower note on left
    res.render('getNotes', {
      layout: false,
      one: note2,
      two: note1,
      diff: diff
    });
  else
    res.render('getNotes', {
      layout: false,
      one: note1,
      two: note2,
      diff: diff
    });
};

exports.post = function(req, res) {
  res.render('post', { title: 'Post success!' });
};

// Deprecated intro page
exports.intro = function(req, res){
  var SIZE = 50;
  var width = (100/SIZE); // As percentages
  var height = (100/SIZE);
  var dim = new Array(SIZE); // Annoying, but couldn't think of
  for(var i =0; i<SIZE; i++) // another way to interate in Jade
    dim[i] = i;

  res.render('intro',
    {
      title: 'Call Me Rafi',
      dims: dim,
      wid: width,
      hei: height
    });
};

exports.notFound = function(req, res) {
  res.render('notFound', {title: 'Oops'});//, layout: false});
};

