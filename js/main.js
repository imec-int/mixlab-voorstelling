var pageSize = 150;
var s;

function post(url, player, action, value) {
    var data = {
      method: action
    };

    if (value) {
        data.value = value;
    }

    var message = JSON.stringify(data);
    player[0].contentWindow.postMessage(data, url);
}


function initSkrollr(){
    // init Vimeo players
    var printer = $('#printer');
    var printerurl = window.location.protocol + printer.attr('src').split('?')[0];
    var streamstore = $('#streamstore');
    var streamstoreurl = window.location.protocol + streamstore.attr('src').split('?')[0];

    var mediahack = $('#mediahack');
    var mediahackurl = window.location.protocol + mediahack.attr('src').split('?')[0];

    var mediamusic = $('#mediamusic');
    var mediamusicurl = window.location.protocol + mediamusic.attr('src').split('?')[0];

    s = skrollr.init({
    	render:  function(data){
            // $('.debug').html(data.curTop);
    		console.log(data.curTop);
    		if (data.curTop > 249 && data.curTop < 401) {
                post(printerurl, printer, 'setVolume', '0');
    			post(printerurl, printer, 'play');
                // console.log("lets play");
    		}
            if (data.curTop > 400 || data.curTop < 250) {
                post(printerurl, printer, 'pause');
                // console.log("lets pause");
            }
            if (data.curTop == 1000) {
                post(streamstoreurl, streamstore, 'setVolume', '0');
                post(streamstoreurl, streamstore, 'seekTo', '44');
                post(streamstoreurl, streamstore, 'play');
            }
            if (data.curTop > 1000 && data.curTop < 1201) {
                post(streamstoreurl, streamstore, 'setVolume', '0');
                post(streamstoreurl, streamstore, 'play');
                // console.log("lets play");
            }
            if (data.curTop > 1200 || data.curTop < 1000) {
                post(streamstoreurl, streamstore, 'pause');
                // console.log("lets pause");
            }
            if (data.curTop > 1600 && data.curTop < 1800) {
                post(mediahackurl, mediahack, 'setVolume', '0');
                post(mediahackurl, mediahack, 'play');
                // console.log("lets play");
            }
            if (data.curTop > 1799 || data.curTop < 1601) {
                post(mediahackurl, mediahack, 'pause');
                // console.log("lets pause");
            }

            if (data.curTop > 1799 && data.curTop < 2001) {
                post(mediamusicurl, mediamusic, 'setVolume', '0');
                post(mediamusicurl, mediamusic, 'play');
                // console.log("lets play");
            }
            if (data.curTop > 2000 || data.curTop < 1800) {
                post(mediamusicurl, mediamusic, 'pause');
                // console.log("lets pause");
            }



    	}
    });

}


function initKeys(){

    var keyListener = new window.keypress.Listener();

    // keyListener.keyUp('space', function() {
    //     s.animateTo((getcurrentPage()+1)*pageSize);
    //     console.log('space pressed');
    // })

    keyListener.simple_combo("shift space", function() {
        console.log("You pressed shift and space");
        s.animateTo((getcurrentPage()-1)*pageSize);
    });

}

function getcurrentPage(){
    var curpage = Math.floor(s.getScrollTop() / pageSize);
    return curpage;
}

function initSpace(){
    $(window).scrollTop(0);
    window.onkeydown = function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        // return false;
        s.animateTo((getcurrentPage()+1)*pageSize);
        }
    };
}

function pageDown(){
        s.animateTo((getcurrentPage()-1)*pageSize);
        $('.debug').html("down");

    }
function pageUp(){
        s.animateTo((getcurrentPage()-1)*pageSize);
        $('.debug').html("i");

    }



// var hammerOptions = {prevent_default: true, event: 'swipedown', event: 'swipeup' }
var hammerOptions = {}

$(function() {
    // init();
    initSkrollr();
    initKeys();
    initSpace();

    $('body').on('scroll touchmove mousewheel', function(e){
      e.preventDefault();
      e.stopPropagation();
      return false;
    })

    $('body').hammer(hammerOptions);
    $('body').data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    $('body').data('hammer').get('pan').set({ enable: false });

    $('body').hammer(hammerOptions).bind("swipedown", function(){
        page = getcurrentPage();
        $('.debug2').html("down " + getcurrentPage());
        setTimeout( function() {
            s.animateTo((page-1)*pageSize);
        }, 10 );
    // scrollTo(0,600)
            // console.log(s);
            // s.animateTo((getcurrentPage()-1)*pageSize);
     });
     $('body').hammer(hammerOptions).bind("swipeup", function(){
        page = getcurrentPage();
        $('.debug2').html("up " +getcurrentPage());

        setTimeout( function() {
            s.animateTo((page+1)*pageSize);
            // s.animateTo((getcurrentPage()+2)*pageSize);
         }, 10 );

     });
    $('body').hammer(hammerOptions).bind("pan", function(){
        $('.debug').html("pan");
        s.animateTo((getcurrentPage()+2)*pageSize);
    });
        // s.animateTo((getcurrentPage()+2)*pageSize);





});



