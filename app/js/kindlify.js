kindlify = function(image, done) {
  var convert = new Interface('js/convert-worker.js');
  convert.on_stdout = function(txt) { console.log(txt); };
  convert.on_stderr = function(txt) { console.log(txt); };

  convert.addUrl("../im-config/magic.xml",         "/usr/local/etc/ImageMagick/", true);
  convert.addUrl("../im-config/coder.xml",         "/usr/local/etc/ImageMagick/");
  convert.addUrl("../im-config/policy.xml",        "/usr/local/etc/ImageMagick/");
  convert.addUrl("../im-config/english.xml",       "/usr/local/etc/ImageMagick/");
  convert.addUrl("../im-config/locale.xml",        "/usr/local/etc/ImageMagick/");
  convert.addUrl("../im-config/delegates.xml",     "/usr/local/etc/ImageMagick/");
  convert.addUrl("../im-config/kindle_colors.gif", "/");
  convert.addData(image,                           "/test.png");
  convert.allDone().then(function() {
    convert.run('/test.png',
      //'-resize', "600x800^",
      //'-gravity', 'center',
      //'-crop', '600x800+0+0',
      '-dither', 'FloydSteinberg',
      '-remap', '/kindle_colors.gif',
      '/result.png')
    .then(function() {
      convert.getFile('result.png').then(function(real_contents) {
        done(real_contents);
      });
    });
  });
};