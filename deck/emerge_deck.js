window.onload = function() {

  Reveal.initialize({
    history: true,
    dependencies: [
      {
        src: 'plugins/markdown/marked.js',
        condition: function() {
          return !!document.querySelector('[data-markdown]');
        }
      },
      {
        src: 'plugins/markdown/markdown.js',
        condition: function() {
          return !!document.querySelector('[data-markdown]');
        }
      }
      // {
      //   src: 'plugins/socket.io-client/socket.io.js',
      //   async:  true
      // }
    ]
  });

  // socket.io
  var socket = io.connect('http://localhost:5000');

  socket.on('message', function(data) {
    console.log(data);
    socket.emit('message', 'Welcome from the Front');
  });

  socket.on('slidechanged', function(data) {
    console.log('server slidechanged received');
    Reveal.slide(data.indexh, data.indexv, data.indexf);
  });

  var notifyServer = function(event) {
    var data = {
      indexv  : Reveal.getIndices().v,
      indexh  : Reveal.getIndices().h,
      indexf  : Reveal.getIndices().f || 0
    };
    socket.emit('slidechanged', data);
    console.log(event);
  }

  Reveal.addEventListener('slidechanged', notifyServer);
  Reveal.addEventListener('fragmentshown', notifyServer);
  Reveal.addEventListener('fragmenthidden', notifyServer);
};
