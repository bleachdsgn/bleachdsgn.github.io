/*
 js-mindmap

 Copyright (c) 2008/09/10 Kenneth Kufluk http://kenneth.kufluk.com/

 MIT (X11) license

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*/

/*
  Things to do:
    - remove Lines - NO - they seem harmless enough!
    - add better "make active" methods
    - remove the "root node" concept.  Tie nodes to elements better, so we can check if a parent element is root

    - allow progressive exploration
      - allow easy supplying of an ajax param for loading new kids and a loader anim
    - allow easy exploration of a ul or ol to find nodes
    - limit to an area
    - allow more content (div instead of an a)
    - test multiple canvases
    - Hidden children should not be bounded
    - Layout children in circles
    - Add/Edit nodes
    - Resize event
    - incorporate widths into the forces, so left boundaries push on right boundaries


  Make demos:
    - amazon explore
    - directgov explore
    - thesaurus
    - themes

*/

(function ($) {
  'use strict';

  var TIMEOUT = 4,  // movement timeout in seconds
    CENTRE_FORCE = 3,  // strength of attraction to the centre by the active node
    Node,
    Line;

  // Define all Node related functions.
  Node = function (obj, name, parent, opts) {
    this.obj = obj;
    this.options = obj.options;

    this.name = name;
    this.href = opts.href;
    if (opts.url) {
      this.url = opts.url;
    }

    // create the element for display
    this.el = $('<a href="' + this.href + '">' + this.name + '</a>').addClass('node');
    $('body').prepend(this.el);

    if (!parent) {
      obj.activeNode = this;
      this.el.addClass('active root');
    } else {
      obj.lines[obj.lines.length] = new Line(obj, this, parent);
    }
    this.parent = parent;
    this.children = [];
    if (this.parent) {
      this.parent.children.push(this);
    }

    // animation handling
    this.moving = false;
    this.moveTimer = 0;
    this.obj.movementStopped = false;
    this.visible = true;
    this.x = 1;
    this.y = 1;
    this.dx = 0;
    this.dy = 0;
    this.hasPosition = false;

    this.content = []; // array of content elements to display onclick;

    this.el.css('position', 'absolute');

    var thisnode = this;

    this.el.draggable({
      drag: function () {
        obj.root.animateToStatic();
      }
    });

    if (thisnode.name == "Mento") {

      $(this.el).addClass('mento center');

    };

    if (thisnode.name == "Ska") {

      $(this.el).addClass('ska center');
  
    };

    if (thisnode.name == "Rocksteady") {

      $(this.el).addClass('rocksteady center');
  
    };

    if (thisnode.name == "Reggae") {

      $(this.el).addClass('reggae center');
  
    };

    if (thisnode.name == "Dub") {

      $(this.el).addClass('dub center');
  
    };

    if (thisnode.name == "Dancehall") {

      $(this.el).addClass('dancehall center');

    };

    if (thisnode.name == "Reggae Fusion") {

      $(this.el).addClass('reggaefusion center');
  
    };

    if (thisnode.name == "R&B") {

      $(this.el).addClass('randb center');
  
    };

    if (thisnode.name == "Soul") {

      $(this.el).addClass('soul center');
  
    };

    if (thisnode.name == "Lover’s Rock") {

      $(this.el).addClass('loversrock center');
  
    };

    if (thisnode.name == "Punk Rock") {

      $(this.el).addClass('punkrock center');
  
    };

    if (thisnode.name == "2 Tone") {

      $(this.el).addClass('two-tone center');
  
    };

    if (thisnode.name == "Hip-Hop") {

      $(this.el).addClass('hip-hop center');
  
    };

    if (thisnode.name == "Third Wave Ska") {

      $(this.el).addClass('thirdwaveska center');
  
    };

    if (thisnode.name == "Jungle") {

      $(this.el).addClass('jungle center');      
  
    };

    if (thisnode.name == "Trip-Hop") {

      $(this.el).addClass('trip-hop center');
  
    };

    if (thisnode.name == "Jazz") {

      $(this.el).addClass('jazz center');
  
    };

    if (thisnode.name == "UK Garage") {

      $(this.el).addClass('ukgarage center');
  
    };

    if (thisnode.name == "Grime") {

      $(this.el).addClass('grime center');
  
    };

    if (thisnode.name == "Dubstep") {

      $(this.el).addClass('dubstep center');
  
    };

    this.el.click(function () {
      //every time a node is clicked, this function should fire - you can use values from thisnode here, for example:
      console.log(thisnode.name);
      console.log(thisnode.href);

      if (thisnode.name == "Mento") {

        $(this.el).css('color','#fdd108');
        $(this.el).css('background-color','#079b49');

        $('.spine-wrapper').css('background-color','#079b49');
        $('.spine-wrapper').css('background-color','#079b49');
        $('.spine-wrapper.left').css('color','#fdd108');
        $('.spine-wrapper.left:before').css('color','#fdd108');
        $('.spine-wrapper.right').css('color','#fdd108');
        $('.spine-wrapper.right:before').css('color','#fdd108');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Npir5jYtzUy4eBPA39a_xve8&autoplay=1&loop=1");
        $('#genre').text('Mento draws on musical traditions brought by West African slaves. They also absorbed European musical traditions, creating a new form. Typically featuring acoustic instruments, such as guitar, banjo, hand drums, and the rhumba box—a large mbira in the shape of a box that can be sat on while played. The lyrics of mento songs often deal with aspects of everyday life in a light-hearted and humorous way. Many comment on poverty, poor housing, and other social issues. Thinly veiled sexual references and innuendo are also common. Although the treatment of such subjects in mento is comparatively innocent, their appearance has sometimes been seen as a precursor of the slackness found in modern dancehall.');

      } else if (thisnode.name == "Ska") {

        $('.spine-wrapper').css('background-color','#fdd108');
        $('.spine-wrapper').css('background-color','#fdd108');
        $('.spine-wrapper.left').css('color','#079b49');
        $('.spine-wrapper.left:before').css('color','#079b49');
        $('.spine-wrapper.right').css('color','#079b49');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Npj4HeQ9EvjONLCwXI-I6qRz&autoplay=1&loop=1");
        $('#genre').text('Combining elements of mento and calypso with American jazz and rhythm and blues, ska is characterized by a walking bass line accented with rhythms on the upbeat. In the early 1960s, ska was the dominant music genre of Jamaica and was popular with British mods.');

      } else if (thisnode.name == "Rocksteady") {

        $('.spine-wrapper').css('background-color','#ee362b');
        $('.spine-wrapper').css('background-color','#ee362b');
        $('.spine-wrapper.left').css('color','#040807');
        $('.spine-wrapper.left:before').css('color','#040807');
        $('.spine-wrapper.right').css('color','#040807');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpjVdM7HbCutvj_O9UtYmPjR&autoplay=1&loop=1");
        $('#genre').text('The music of Jamaica’s rude boys by the mid-1960s put heavy emphasis on the bass line, as opposed to ska’s strong horn section and the rhythm guitar began playing on the upbeat.');

      } else if (thisnode.name == "Reggae") {

        $('.spine-wrapper').css('background-color','#fbdd00');
        $('.spine-wrapper').css('background-color','#fbdd00');
        $('.spine-wrapper.left').css('color','#0f8944');
        $('.spine-wrapper.left:before').css('color','#0f8944');
        $('.spine-wrapper.right').css('color','#0f8944');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpjdG0ixD5L72c__0WTom_3c&autoplay=1&loop=1");
        $('#genre').text('Evolved out of ska and rocksteady in the late 1960s. The tempo of reggae is usually slower than ska but faster than rocksteady. The bass guitar often plays the dominant role in reggae. The guitar in reggae usually plays on the off beat of the rhythm. The Rastafari movement was a key element in the development of reggae, infusing the music with a sense of spirituality. Reggae became popular around the world, due in large part to the international success of artists like Bob Marley, Peter Tosh and Bunny Wailer. Marley’s lyrics about love, redemption and natural beauty captivated audiences, and he gained headlines when he joined the hands of political rivals Michael Manley and Edward Seaga at the One Love Concert.');
  
      } else if (thisnode.name == "Dub") {

        $('.spine-wrapper').css('background-color','#ed3426');
        $('.spine-wrapper').css('background-color','#ed3426');
        $('.spine-wrapper.left').css('color','#91c53f');
        $('.spine-wrapper.left:before').css('color','#91c53f');
        $('.spine-wrapper.right').css('color','#91c53f');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpgVCKIgJ38WubWhGizWMQpG&autoplay=1&loop=1");
        $('#genre').text('A genre of electronic music that grew out of reggae in the 1960s, and is commonly considered a subgenre, though it has developed to extend beyond the scope of reggae. Music in this genre consists predominantly of instrumental remixes of existing recordings and is achieved by significantly manipulating and reshaping the recordings, usually by removing the vocals and emphasizing the drum and bass parts. Other techniques include dynamically adding extensive echo, reverb, panoramic delay, and occasional dubbing of vocal or instrumental snippets from the original version or other works.');
  
      } else if (thisnode.name == "Dancehall") {

        $('.spine-wrapper').css('background-color','#000000');
        $('.spine-wrapper').css('background-color','#000000');
        $('.spine-wrapper.left').css('color','#ffde0c');
        $('.spine-wrapper.left:before').css('color','#ffde0c');
        $('.spine-wrapper.right').css('color','#ffde0c');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpicqSGsRLGoo1iVUzQAzNGZ&autoplay=1&loop=1");
        $('#genre').text('Social and political changes in late-1970s Jamaica, including the change from the socialist government of Michael Manley (People’s National Party) to Edward Seaga (Jamaica Labour Party), were reflected in the shift away from the more internationally oriented roots reggae towards a style geared more towards local consumption and in tune with the music that Jamaicans had experienced when sound systems performed live. Dub poet Mutabaruka said, “If 1970s reggae was red, green and gold, then in the next decade it was gold chains”. It was far removed from reggae’s gentle roots and culture, and there was much debate among purists as to whether it should be considered an extension of reggae. Themes of social injustice, repatriation and the Rastafari movement were overtaken by lyrics about dancing, violence and sexuality.');
  
      } else if (thisnode.name == "Reggae Fusion") {

        $('.spine-wrapper').css('background-color','#b71f71');
        $('.spine-wrapper').css('background-color','#b71f71');
        $('.spine-wrapper.left').css('color','#4ab96d');
        $('.spine-wrapper.left:before').css('color','#4ab96d');
        $('.spine-wrapper.right').css('color','#4ab96d');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Npimmn3W5paNVoSBG0IG-v0x&autoplay=1&loop=1");
        $('#genre').text('');

      } else if (thisnode.name == "R&B") {

        $('.spine-wrapper').css('background-color','#91318f');
        $('.spine-wrapper').css('background-color','#91318f');
        $('.spine-wrapper.left').css('color','#91318f');
        $('.spine-wrapper.left:before').css('color','#e5ce81');
        $('.spine-wrapper.right').css('color','#e5ce81');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Npimmn3W5paNVoSBG0IG-v0x&autoplay=1&loop=1");
        $('#genre').text('');
  
    } else if (thisnode.name == "Soul") {

        $('.spine-wrapper').css('background-color','#bd2727');
        $('.spine-wrapper').css('background-color','#bd2727');
        $('.spine-wrapper.left').css('color','#bd2727');
        $('.spine-wrapper.left:before').css('color','#fcbe34');
        $('.spine-wrapper.right').css('color','#fcbe34');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Npimmn3W5paNVoSBG0IG-v0x&autoplay=1&loop=1");
        $('#genre').text('');
  
    } else if (thisnode.name == "Hip-Hop") {

        $('.spine-wrapper').css('background-color','#ffde0c');
        $('.spine-wrapper').css('background-color','#ffde0c');
        $('.spine-wrapper.left').css('color','#000000');
        $('.spine-wrapper.left:before').css('color','#000000');
        $('.spine-wrapper.right').css('color','#000000');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Npimmn3W5paNVoSBG0IG-v0x&autoplay=1&loop=1");
        $('#genre').text('');
  
    } else if (thisnode.name == "Third Wave Ska") {

        $('.spine-wrapper').css('background-color','#2a4082');
        $('.spine-wrapper').css('background-color','#2a4082');
        $('.spine-wrapper.left').css('color','#e9879a');
        $('.spine-wrapper.left:before').css('color','#e9879a');
        $('.spine-wrapper.right').css('color','#e9879a');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpgzVBRedrNnsH5aC2hJ_QT9&autoplay=1&loop=1");
        $('#genre').text('By the early 1980s, 2 Tone-influenced ska bands began forming throughout the United States. Third wave ska originated in the punk scene in the 1980s and became commercially successful in the 1990s. Although some third wave ska has a traditional 1960s sound, most third wave ska is characterized by dominating guitar riffs and large horn sections.');
  
    } else if (thisnode.name == "Jungle") {

        $('.spine-wrapper').css('background-color','#000000');
        $('.spine-wrapper').css('background-color','#000000');
        $('.spine-wrapper.left').css('color','#079b49');
        $('.spine-wrapper.left:before').css('color','#079b49');
        $('.spine-wrapper.right').css('color','#079b49');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpitawDzE6PKJ2hELfjBxsiC&autoplay=1&loop=1");
        $('#genre').text('A genre of electronic music that developed in England in the early 1990s, jungle was a form of cultural expression for London’s lower class urban youth. The Post-Thatcherite United Kingdom of the early 1990s had left many urbanites (especially young urbanites) disenfranchised and disillusioned with a seemingly crumbling societal structure. Jungle reflected these feelings; it was a notably more dark, less euphoric style of music than many of the other styles popular at raves. Jungle was a racially mixed scene, but was much more popular with black British youths than other rave styles, such as techno. Jungle producers incorporated classic Jamaican/Caribbean sound-system culture production-methods. The slow, deep bass lines and simple melodies (reminiscent of those found in dub, reggae and dancehall) accentuated the overall production, giving jungle its “rolling” quality.');
  
    } else if (thisnode.name == "Trip-Hop") {

        $('.spine-wrapper').css('background-color','#180f35');
        $('.spine-wrapper').css('background-color','#180f35');
        $('.spine-wrapper.left').css('color','#8a99be');
        $('.spine-wrapper.left:before').css('color','#8a99be');
        $('.spine-wrapper.right').css('color','#8a99be');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpiDvP8hI4ZCoUwRx5BjV21d&autoplay=1&loop=1");
        $('#genre').text('');

    } else if (thisnode.name == "Jazz") {

        $('.spine-wrapper').css('background-color','#faa332');
        $('.spine-wrapper').css('background-color','#faa332');
        $('.spine-wrapper.left').css('color','#460c3e');
        $('.spine-wrapper.left:before').css('color','#460c3e');
        $('.spine-wrapper.right').css('color','#460c3e');
        $('#playlist').attr("src", "");
        $('#genre').text('');
  
    } else if (thisnode.name == "UK Garage") {

        $('.spine-wrapper').css('background-color','#db1473');
        $('.spine-wrapper').css('background-color','#db1473');
        $('.spine-wrapper.left').css('color','#162746');
        $('.spine-wrapper.left:before').css('color','#162746');
        $('.spine-wrapper.right').css('color','#162746');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpjbuJ-wMo46wP8vyR_j-MPo&autoplay=1&loop=1");
        $('#genre').text('In the United Kingdom, where jungle was very popular at the time, garage was played in a second room at jungle events. After jungle’s peak in cultural significance, it had turned towards a harsher, more techstep influenced sound, driving away dancers, predominantly women. Escaping the 170bpm jungle basslines, the garage rooms had a much more sensual and soulful sound at 130bpm.');
  
    } else if (thisnode.name == "Grime") {

        $('.spine-wrapper').css('background-color','#999999');
        $('.spine-wrapper').css('background-color','#999999');
        $('.spine-wrapper.left').css('color','#000000');
        $('.spine-wrapper.left:before').css('color','#000000');
        $('.spine-wrapper.right').css('color','#000000');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8Nphqt7EB67QWExaBY9k4NIUL&autoplay=1&loop=1");
        $('#genre').text('Grime is a genre of music that emerged in England in the early 2000s. It is primarily a development of UK garage, drum and bass and dancehall. Grime is not an offshoot of early electronic music, but rather a subgenre that draws from a wide variety of influences. Early innovative artists were able to take the strong thumping drums of drum and bass, lyricism and vocal styles of UK Garage and alter some of the rhythms of dancehall to capture all three genre’s essences and add a new half-time, down-tempo dimension to the mix.');
  
    } else if (thisnode.name == "Dubstep") {

      // $(this.el).css('color','#4ab96d');
      // $(this.el).css('background-color','#724c9f');

        $('.spine-wrapper').css('background-color','#724c9f');
        $('.spine-wrapper').css('background-color','#724c9f');
        $('.spine-wrapper.left').css('color','#4ab96d');
        $('.spine-wrapper.left:before').css('color','#4ab96d');
        $('.spine-wrapper.right').css('color','#4ab96d');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpgaM5tooB3BVpq_vKRGpuan&autoplay=1&loop=1");
        $('#genre').text('A genre of electronic dance music that emerged in the late 1990s  in South London, England. In the UK the origins of the genre can be traced back to the growth of the Jamaican sound system party scene in the early 1980s. The music generally features syncopated drum and percussion patterns with bass lines that contain prominent sub bass frequencies.');
  
    } else if (thisnode.name == "Punk Rock") {

        $('.spine-wrapper').css('background-color','#e57c89');
        $('.spine-wrapper').css('background-color','#e57c89');
        $('.spine-wrapper.left').css('color','#098346');
        $('.spine-wrapper.left:before').css('color','#098346');
        $('.spine-wrapper.right').css('color','#098346');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NpjN8vt9s_w7dTC-XsMstrBv&autoplay=1&loop=1");
        $('#genre').text('');

    } else if (thisnode.name == "2 Tone") {

        $('.spine-wrapper').css('background-color','#f0d811');
        $('.spine-wrapper').css('background-color','#f0d811');
        $('.spine-wrapper.left').css('color','#ed0e6b');
        $('.spine-wrapper.left:before').css('color','#ed0e6b');
        $('.spine-wrapper.right').css('color','#ed0e6b');
        $('#playlist').attr("src", "https://www.youtube.com/embed/videoseries?list=PLus8Qcnp8NphdQyvjZavdFp92LZ1oiq_k&autoplay=1&loop=1");
        $('#genre').text('The genre, which began in the late 1970s in the Coventry, England area, was a fusion of Jamaican ska rhythms and melodies with punk rock’s more aggressive guitar chords and lyrics. Compared to 1960s ska, 2 Tone music had faster tempos, fuller instrumentation and a harder edge. The 2 Tone movement promoted racial unity at a time when racial tensions were high in the UK. ');
    };

      if (obj.activeNode) {
        obj.activeNode.el.removeClass('active');
        if (obj.activeNode.parent) {
          obj.activeNode.parent.el.removeClass('activeparent');
        }
      }
      if (typeof opts.onclick === 'function') {
        opts.onclick(thisnode);
      }
      obj.activeNode = thisnode;
      obj.activeNode.el.addClass('active');
      if (obj.activeNode.parent) {
        obj.activeNode.parent.el.addClass('activeparent');
      }
      obj.root.animateToStatic();
      return false;
    });

  };

  // ROOT NODE ONLY:  control animation loop
  Node.prototype.animateToStatic = function () {

    clearTimeout(this.moveTimer);
    // stop the movement after a certain time
    var thisnode = this;
    this.moveTimer = setTimeout(function () {
      //stop the movement
      thisnode.obj.movementStopped = true;
    }, TIMEOUT * 1000);

    if (this.moving) {
      return;
    }
    this.moving = true;
    this.obj.movementStopped = false;
    this.animateLoop();
  };

  // ROOT NODE ONLY:  animate all nodes (calls itself recursively)
  Node.prototype.animateLoop = function () {
    var i, len, mynode = this;
    this.obj.canvas.clear();
    for (i = 0, len = this.obj.lines.length; i < len; i++) {
      this.obj.lines[i].updatePosition();
    }
    if (this.findEquilibrium() || this.obj.movementStopped) {
      this.moving = false;
      return;
    }
    setTimeout(function () {
      mynode.animateLoop();
    }, 10);
  };

  // find the right position for this node
  Node.prototype.findEquilibrium = function () {
    var i, len, stable = true;
    stable = this.display() && stable;
    for (i = 0, len = this.children.length; i < len; i++) {
      stable = this.children[i].findEquilibrium() && stable;
    }
    return stable;
  };

  //Display this node, and its children
  Node.prototype.display = function (depth) {
    var parent = this,
      stepAngle,
      angle;

    depth = depth || 0;

    if (this.visible) {
      // if: I'm not active AND my parent's not active AND my children aren't active ...
      if (this.obj.activeNode !== this && this.obj.activeNode !== this.parent && this.obj.activeNode.parent !== this) {
        // TODO hide me!
        this.el.hide();
        this.visible = false;
      }
    } else {
      if (this.obj.activeNode === this || this.obj.activeNode === this.parent || this.obj.activeNode.parent === this) {
        this.el.show();
        this.visible = true;
      }
    }
    this.drawn = true;
    // am I positioned?  If not, position me.
    if (!this.hasPosition) {
      this.x = this.options.mapArea.x / 2;
      this.y = this.options.mapArea.y / 2;
      this.el.css({'left': this.x + "px", 'top': this.y + "px"});
      this.hasPosition = true;
    }
    // are my children positioned?  if not, lay out my children around me
    stepAngle = Math.PI * 2 / this.children.length;
    $.each(this.children, function (index) {
      if (!this.hasPosition) {
        if (!this.options.showProgressive || depth <= 1) {
          angle = index * stepAngle;
          this.x = (50 * Math.cos(angle)) + parent.x;
          this.y = (50 * Math.sin(angle)) + parent.y;
          this.hasPosition = true;
          this.el.css({'left': this.x + "px", 'top': this.y + "px"});
        }
      }
    });
    // update my position
    return this.updatePosition();
  };

  // updatePosition returns a boolean stating whether it's been static
  Node.prototype.updatePosition = function () {
    var forces, showx, showy;

    if (this.el.hasClass("ui-draggable-dragging")) {
      this.x = parseInt(this.el.css('left'), 10) + (this.el.width() / 2);
      this.y = parseInt(this.el.css('top'), 10) + (this.el.height() / 2);
      this.dx = 0;
      this.dy = 0;
      return false;
    }

    //apply accelerations
    forces = this.getForceVector();
    this.dx += forces.x * this.options.timeperiod;
    this.dy += forces.y * this.options.timeperiod;

    // damp the forces
    this.dx = this.dx * this.options.damping;
    this.dy = this.dy * this.options.damping;

    //ADD MINIMUM SPEEDS
    if (Math.abs(this.dx) < this.options.minSpeed) {
      this.dx = 0;
    }
    if (Math.abs(this.dy) < this.options.minSpeed) {
      this.dy = 0;
    }
    if (Math.abs(this.dx) + Math.abs(this.dy) === 0) {
      return true;
    }
    //apply velocity vector
    this.x += this.dx * this.options.timeperiod;
    this.y += this.dy * this.options.timeperiod;
    this.x = Math.min(this.options.mapArea.x, Math.max(1, this.x));
    this.y = Math.min(this.options.mapArea.y, Math.max(1, this.y));
    // display
    showx = this.x - (this.el.width() / 2);
    showy = this.y - (this.el.height() / 2) - 10;
    this.el.css({'left': showx + "px", 'top': showy + "px"});
    return false;
  };

  Node.prototype.getForceVector = function () {
    var i, x1, y1, xsign, dist, theta, f,
      xdist, rightdist, bottomdist, otherend,
      fx = 0,
      fy = 0,
      nodes = this.obj.nodes,
      lines = this.obj.lines;

    // Calculate the repulsive force from every other node
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === this) {
        continue;
      }
      if (!nodes[i].visible) {
        continue;
      }
      // Repulsive force (coulomb's law)
      x1 = (nodes[i].x - this.x);
      y1 = (nodes[i].y - this.y);
      //adjust for variable node size
//    var nodewidths = (($(nodes[i]).width() + this.el.width())/2);
      dist = Math.sqrt((x1 * x1) + (y1 * y1));
//      var myrepulse = this.options.repulse;
//      if (this.parent==nodes[i]) myrepulse=myrepulse*10;  //parents stand further away
      if (Math.abs(dist) < 500) {
        if (x1 === 0) {
          theta = Math.PI / 2;
          xsign = 0;
        } else {
          theta = Math.atan(y1 / x1);
          xsign = x1 / Math.abs(x1);
        }
        // force is based on radial distance
        f = (this.options.repulse * 500) / (dist * dist);
        fx += -f * Math.cos(theta) * xsign;
        fy += -f * Math.sin(theta) * xsign;
      }
    }

    // add repulsive force of the "walls"
    //left wall
    xdist = this.x + this.el.width();
    f = (this.options.wallrepulse * 500) / (xdist * xdist);
    fx += Math.min(2, f);
    //right wall
    rightdist = (this.options.mapArea.x - xdist);
    f = -(this.options.wallrepulse * 500) / (rightdist * rightdist);
    fx += Math.max(-2, f);
    //top wall
    f = (this.options.wallrepulse * 500) / (this.y * this.y);
    fy += Math.min(2, f);
    //bottom wall
    bottomdist = (this.options.mapArea.y - this.y);
    f = -(this.options.wallrepulse * 500) / (bottomdist * bottomdist);
    fy += Math.max(-2, f);

    // for each line, of which I'm a part, add an attractive force.
    for (i = 0; i < lines.length; i++) {
      otherend = null;
      if (lines[i].start === this) {
        otherend = lines[i].end;
      } else if (lines[i].end === this) {
        otherend = lines[i].start;
      } else {
        continue;
      }
      // Ignore the pull of hidden nodes
      if (!otherend.visible) {
        continue;
      }
      // Attractive force (hooke's law)
      x1 = (otherend.x - this.x);
      y1 = (otherend.y - this.y);
      dist = Math.sqrt((x1 * x1) + (y1 * y1));
      if (Math.abs(dist) > 0) {
        if (x1 === 0) {
          theta = Math.PI / 2;
          xsign = 0;
        }
        else {
          theta = Math.atan(y1 / x1);
          xsign = x1 / Math.abs(x1);
        }
        // force is based on radial distance
        f = (this.options.attract * dist) / 70000;
        fx += f * Math.cos(theta) * xsign;
        fy += f * Math.sin(theta) * xsign;
      }
    }

    // if I'm active, attract me to the centre of the area
    if (this.obj.activeNode === this) {
      // Attractive force (hooke's law)
      otherend = this.options.mapArea;
      x1 = ((otherend.x / 2) - this.options.centreOffset - this.x);
      y1 = ((otherend.y / 2) - this.y);
      dist = Math.sqrt((x1 * x1) + (y1 * y1));
      if (Math.abs(dist) > 0) {
        if (x1 === 0) {
          theta = Math.PI / 2;
          xsign = 0;
        } else {
          xsign = x1 / Math.abs(x1);
          theta = Math.atan(y1 / x1);
        }
        // force is based on radial distance
        f = (0.1 * this.options.attract * dist * CENTRE_FORCE) / 10000;
        fx += f * Math.cos(theta) * xsign;
        fy += f * Math.sin(theta) * xsign;
      }
    }

    if (Math.abs(fx) > this.options.maxForce) {
      fx = this.options.maxForce * (fx / Math.abs(fx));
    }
    if (Math.abs(fy) > this.options.maxForce) {
      fy = this.options.maxForce * (fy / Math.abs(fy));
    }
    return {
      x: fx,
      y: fy
    };
  };

  Node.prototype.removeNode = function () {
    var i,
      oldnodes = this.obj.nodes,
      oldlines = this.obj.lines;

    for (i = 0; i < this.children.length; i++) {
      this.children[i].removeNode();
    }

    this.obj.nodes = [];
    for (i = 0; i < oldnodes.length; i++) {
      if (oldnodes[i] === this) {
        continue;
      }
      this.obj.nodes.push(oldnodes[i]);
    }

    this.obj.lines = [];
    for (i = 0; i < oldlines.length; i++) {
      if (oldlines[i].start === this) {
        continue;
      } else if (oldlines[i].end === this) {
        continue;
      }
      this.obj.lines.push(oldlines[i]);
    }

    this.el.remove();
  };




  // Define all Line related functions.
  Line = function (obj, startNode, endNode) {
    this.obj = obj;
    this.options = obj.options;
    this.start = startNode;
    this.colour = "blue";
    this.size = "thick";
    this.end = endNode;
  };

  Line.prototype.updatePosition = function () {
    if (!this.options.showSublines && (!this.start.visible || !this.end.visible)) {
      return;
    }
    this.size = (this.start.visible && this.end.visible) ? "thick" : "thin";
    this.color = (this.obj.activeNode.parent === this.start || this.obj.activeNode.parent === this.end) ? "red" : "blue";

    this.obj.canvas.path("M" + this.start.x + ' ' + this.start.y + "L" + this.end.x + ' ' + this.end.y).attr({'stroke': "black", 'opacity': 0.1, 'stroke-width': '5px', 'stroke-dasharray': 5});
  };

  $.fn.addNode = function (parent, name, options) {
    var obj = this[0],
      node = obj.nodes[obj.nodes.length] = new Node(obj, name, parent, options);
    console.log(obj.root);
    obj.root.animateToStatic();
    return node;
  };

  $.fn.addRootNode = function (name, opts) {
    var node = this[0].nodes[0] = new Node(this[0], name, null, opts);
    this[0].root = node;
    return node;
  };

  $.fn.removeNode = function (name) {
    return this.each(function () {
//      if (!!this.mindmapInit) return false;
      //remove a node matching the anme
//      alert(name+' removed');
    });
  };

  $.fn.mindmap = function (options) {
    // Define default settings.
    options = $.extend({
      attract: 15,
      repulse: 6,
      damping: 0.55,
      timeperiod: 10,
      wallrepulse: 0.4,
      mapArea: {
        x: -1,
        y: -1
      },
      canvasError: 'alert',
      minSpeed: 0.05,
      maxForce: 0.1,
      showSublines: false,
      updateIterationCount: 20,
      showProgressive: true,
      centreOffset: 100,
      timer: 0
    }, options);

    var $window = $(window);

    return this.each(function () {
      var mindmap = this;

      this.mindmapInit = true;
      this.nodes = [];
      this.lines = [];
      this.activeNode = null;
      this.options = options;
      this.animateToStatic = function () {
        this.root.animateToStatic();
      };
      $window.resize(function () {
        mindmap.animateToStatic();
      });

      //canvas
      if (options.mapArea.x === -1) {
        options.mapArea.x = $window.width();
      }
      if (options.mapArea.y === -1) {
        options.mapArea.y = $window.height();
      }
      //create drawing area
      this.canvas = Raphael(0, 0, options.mapArea.x, options.mapArea.y);

      // Add a class to the object, so that styles can be applied
      $(this).addClass('js-mindmap-active');


      // Add keyboard support (thanks to wadefs)
      $(this).keyup(function (event) {
        var newNode, i, activeParent = mindmap.activeNode.parent;
        switch (event.which) {
        case 33: // PgUp
        case 38: // Up, move to parent
          if (activeParent) {
            activeParent.el.click();
          }
          break;
        case 13: // Enter (change to insert a sibling)
        case 34: // PgDn
        case 40: // Down, move to first child
          if (mindmap.activeNode.children.length) {
            mindmap.activeNode.children[0].el.click();
          }
          break;
        case 37: // Left, move to previous sibling
          if (activeParent) {
            newNode = null;
            if (activeParent.children[0] === mindmap.activeNode) {
              newNode = activeParent.children[activeParent.children.length - 1];
            } else {
              for (i = 1; i < activeParent.children.length; i++) {
                if (activeParent.children[i] === mindmap.activeNode) {
                  newNode = activeParent.children[i - 1];
                }
              }
            }
            if (newNode) {
              newNode.el.click();
            }
          }
          break;
        case 39: // Right, move to next sibling
          if (activeParent) {
            newNode = null;
            if (activeParent.children[activeParent.children.length - 1] === mindmap.activeNode) {
              newNode = activeParent.children[0];
            } else {
              for (i = activeParent.children.length - 2; i >= 0; i--) {
                if (activeParent.children[i] === mindmap.activeNode) {
                  newNode = activeParent.children[i + 1];
                }
              }
            }
            if (newNode) {
              newNode.el.click();
            }
          }
          break;
        case 45: // Ins, insert a child
          break;
        case 46: // Del, delete this node
          break;
        case 27: // Esc, cancel insert
          break;
        case 83: // 'S', save
          break;
        }
        return false;
      });

    });
  };
}(jQuery));

/*jslint devel: true, browser: true, continue: true, plusplus: true, indent: 2 */