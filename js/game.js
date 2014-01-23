var game = {
  started: 0,
  allow: function(){
    game.started = 1;
    $('#play').addClass('active').on('click', game.play); 
  },
  start: function(){
    lightspeed();
    game.loop();
    game.asteroids.push(
      new game.asteroid(0, 0),
      new game.asteroid(0, h),
      new game.asteroid(w, 0),
      new game.asteroid(w, h)
    );
    $(function(){ setTimeout(game.gethead, 2500) });
  },
  play: function(){
    $('.intro').hide();
    $('#player').show();   
    //asteroids
  },
  gethead: function(){
    game.headTracker = tQuery.createHeadtrackr().start().debugView(true).addEventListener("found", game.onhead);
  },
  onhead: function(event){
    if(!game.started) game.allow();
    starsMove(event);
    var x = (event.x * -50), y = (event.y * -50);
    $('#player').css({
      '-webkit-transform': 'rotateY(180deg) translate3D('+ x +'em, '+ y +'em, 0em)'
    });    
  },
  asteroids: [],
  asteroid: function(x, y){
    this.x = x || 0; this.y = y || 0, this.z = -400;
    this.speed = 1;
    this.img = $('<img>').attr({
      'src': 'img/asteroid1.gif'
    }).css({
      '-webkit-transform': 'translate3D('+this.x+'px, '+this.y+'px, '+this.z+'em)'
    });
    $('#tridiv').prepend(this.img);
  },
  moveAsteroids: function(){
    for(var i = 0; i < this.asteroids.length; ++i){
      var a = this.asteroids[i];
      a.z += a.speed;
      if(a.z > 0) a.z = -400;
      a.img.css({
        '-webkit-transform': 'translate3D('+a.x+'px, '+a.y+'px, '+a.z+'em)'
      })
    }
  },
  loop: function(){
    game.moveAsteroids();
    setTimeout(game.loop, 5);
  }
};
game.start()
