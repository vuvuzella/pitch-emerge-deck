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
    ]
  });
};
