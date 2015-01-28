var pageSize = 150;
var s;
var page = 0;

var printer, streamstore, mediahack, mediamusic;
function initVideos() {
    printer = $f( $('#printer')[0]);
}

function initKeys(){

    var keyListener = new window.keypress.Listener();

    // keyListener.keyUp('space', function() {
    //     s.animateTo((getcurrentPage()+1)*pageSize);
    //     console.log('space pressed');
    // })

    keyListener.simple_combo("shift space", function() {
        console.log("You pressed shift and space");
        // s.animateTo((getcurrentPage()-1)*pageSize);
        pageUp();
    });

}

// function getcurrentPage(){
//     var curpage = Math.floor(s.getScrollTop() / pageSize);
//     return curpage;
// }

function initSpace(){
    $(window).scrollTop(0);
    window.onkeydown = function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        // return false;
        // s.animateTo((getcurrentPage()+1)*pageSize);
        pageDown();
        }
    };
}

function pageDown(){
        // s.animateTo((getcurrentPage()-1)*pageSize);
        if (page == 18) {
            return;
        } else {

            page++;
            $( "#main section:eq(" + (page - 1) + ")" ).addClass('fade');
            $( "#main section:eq(" + page +")" ).addClass('slideUp');
            console.log("down, page is " + page + "title = " + $( "#main section:eq(" + (page - 1) +")" ).attr("id") );
            // $('.debug').html("down");
            if (page == 2) {
                printer.api('play');
            }
        }

    }
function pageUp(){
        // s.animateTo((getcurrentPage()-1)*pageSize);
        if (page == 0) {
            return;
        } else {
            page--;
            console.log("now removing slideUp from page: " + page);
            $( "#main section:eq(" + (page + 1) + ")" ).removeClass('slideUp');
            $( "#main section:eq(" + (page - 0) +")" ).removeClass('fade');
            console.log("up, page is " + page + "title = " + $( "#main section:eq(" + (page - 1) +")" ).attr("id") );
            $('.debug').html("i");
          }

    }

// var hammerOptions = {prevent_default: true, event: 'swipedown', event: 'swipeup' }
var hammerOptions = {}

$(function() {
    // init();
    // initSkrollr();



    initVideos();
    initKeys();
    initSpace();

    // $('body').on('scroll touchmove mousewheel', function(e){
    //   e.preventDefault();
    //   e.stopPropagation();
    //   return false;
    // })

    // $('body').hammer(hammerOptions);
    // $('body').data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    // $('body').data('hammer').get('pan').set({ enable: false });

    // $('body').hammer(hammerOptions).bind("swipedown", function(){
    //     page = getcurrentPage();
    //     $('.debug2').html("down " + getcurrentPage());
    //     setTimeout( function() {
    //         s.animateTo((page-1)*pageSize);
    //     }, 10 );
    // // scrollTo(0,600)
    //         // console.log(s);
    //         // s.animateTo((getcurrentPage()-1)*pageSize);
    //  });
    //  $('body').hammer(hammerOptions).bind("swipeup", function(){
    //     page = getcurrentPage();
    //     $('.debug2').html("up " +getcurrentPage());

    //     setTimeout( function() {
    //         s.animateTo((page+1)*pageSize);
    //         // s.animateTo((getcurrentPage()+2)*pageSize);
    //      }, 10 );

    //  });
    // $('body').hammer(hammerOptions).bind("pan", function(){
    //     $('.debug').html("pan");
    //     s.animateTo((getcurrentPage()+2)*pageSize);
    // });
    //     // s.animateTo((getcurrentPage()+2)*pageSize);

    $('#main').imagesLoaded( function() {
        setTimeout(function() {

              // Resize sections
              // adjustWindow();
              console.log("img loaded");

              // Fade in sections
              $('#main').removeClass('loading').addClass('loaded');

        }, 800);
    });



});



