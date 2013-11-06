crop = function(source, x, y, w, h, nw, nh, callback) {
  var img = new Image();
  img.onload = function() {
    var cropMarginWidth = 5,
      canvas = $('<canvas width="'+ nw + '" height="'+ nh + '"/>')
        .hide()
        .appendTo('body'),
      ctx = canvas.get(0).getContext('2d');
    
    ctx.drawImage(img, x, y, w, h, 0, 0, nw, nh);
    
    callback(canvas.get(0).toDataURL());
    
    canvas.remove();
  }

  img.src = source;
}