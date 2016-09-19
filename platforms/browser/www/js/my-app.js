// Initialize app
var myApp = new Framework7({

    cache:false,  
    modalTitle:"Mumbai Parties",
    preloadPreviousPage:false,
    swipeBackPage:false,
    smartSelectSearchbar:true,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    imagesLazyLoadPlaceholder: 'img/card.jpg',
    imagesLazyLoadThreshold: 50,
    animateNavBackIcon:true,

    onAjaxStart: function (xhr) {

        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {

        myApp.hideIndicator();
    }
});


var $$ = Dom7;
$$(document).on('pageInit', function (e) {

    // alert(Lockr.getAll());

    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // alert('Connection type: ' + states[networkState]);

    if(states[networkState]=='No network connection'){

        alert('No network connection');
        return false;
    }

    if(Lockr.get('is_logged_in')){

        var id = Lockr.get('id');
        get_points(id);
    }
    
});

function check_connection(){

    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // alert('Connection type: ' + states[networkState]);

    if(states[networkState]=='No network connection'){
        myApp.alert('Try Again');
    }else{

      if(Lockr.get('is_logged_in')){
        mainView.router.loadPage('location.html');
      }else{
        mainView.router.loadPage('index.html');
      }
    }

}



var mainView = myApp.addView('.view-main', {
    
    dynamicNavbar: true
});

myApp.onPageInit('index', function (page) {
    // alert("index called");
});

myApp.onPageInit('location', function (page) {

    get_location();

    if(Lockr.get("is_logged_in")){

         get_profile(Lockr.get("id"));
         $("#signin-div").html("<h2 class='username'><span>Hi, "+Lockr.get("name")+"</span><br><span id='ref_points' style='color: #b7b3b3;font-size: 14px;'>Points 200</span> </h2>");
         $("#signout-div").css("display","block");
         $("#invite_div").css("display","block");
         $("#booking_div").css("display","block");

         $("#profile_picker").addClass('open-picker close-panel');
         
         // 
         // $("#camera-icon").css("display","block");
    }

});

myApp.onPageInit('entitie', function (page) {

        // Starrr plugin (https://github.com/dobtco/starrr)
        var __slice = [].slice;
        (function($, window) {
            var Starrr;

            Starrr = (function() {
                Starrr.prototype.defaults = {
                    rating: void 0,
                    numStars: 5,
                    change: function(e, value) {}
                };

                function Starrr($el, options) {
                    var i, _, _ref,
                        _this = this;

                    this.options = $.extend({}, this.defaults, options);
                    this.$el = $el;
                    _ref = this.defaults;
                    for (i in _ref) {
                        _ = _ref[i];
                        if (this.$el.data(i) != null) {
                            this.options[i] = this.$el.data(i);
                        }
                    }
                    this.createStars();
                    this.syncRating();
                    this.$el.on('mouseover.starrr', 'i', function(e) {
                        return _this.syncRating(_this.$el.find('i').index(e.currentTarget) + 1);
                    });
                    this.$el.on('mouseout.starrr', function() {
                        return _this.syncRating();
                    });
                    this.$el.on('click.starrr', 'i', function(e) {
                        return _this.setRating(_this.$el.find('i').index(e.currentTarget) + 1);
                    });
                    this.$el.on('starrr:change', this.options.change);
                }

                Starrr.prototype.createStars = function() {
                    var _i, _ref, _results;

                    _results = [];
                    for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                        _results.push(this.$el.append("<i class='fa fa-star-o'></i>"));
                    }
                    return _results;
                };

                Starrr.prototype.setRating = function(rating) {
                    if (this.options.rating === rating) {
                        rating = void 0;
                    }
                    this.options.rating = rating;
                    this.syncRating();
                    return this.$el.trigger('starrr:change', rating);
                };

                Starrr.prototype.syncRating = function(rating) {
                    var i, _i, _j, _ref;

                    rating || (rating = this.options.rating);
                    if (rating) {
                        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                            this.$el.find('i').eq(i).removeClass('fa-star-o').addClass('fa-star');
                        }
                    }
                    if (rating && rating < 5) {
                        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                            this.$el.find('i').eq(i).removeClass('fa-star').addClass('fa-star-o');
                        }
                    }
                    if (!rating) {
                        return this.$el.find('i').removeClass('fa-star').addClass('fa-star-o');
                    }
                };

                return Starrr;

            })();
            return $.fn.extend({
                starrr: function() {
                    var args, option;

                    option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                    return this.each(function() {
                        var data;

                        data = $(this).data('star-rating');
                        if (!data) {
                            $(this).data('star-rating', (data = new Starrr($(this), option)));
                        }
                        if (typeof option === 'string') {
                            return data[option].apply(data, args);
                        }
                    });
                }
            });
            
        })(window.jQuery, window);

        $(function() {
            return $(".starrr").starrr();
        });

              
        $('#stars').on('starrr:change', function(e, value){
            $('#count').html(value);
        });
          
        $('#stars-existing').on('starrr:change', function(e, value){
            $('#count-existing').html(value);
        });

        var id = page.query.id; 
        $('#submit_review').attr('data-id', id);
        get_entitie(id);
        
});

myApp.onPageInit('event', function (page) {

        var id = page.query.id;
        get_event(id);
        
});

myApp.onPageInit('offer', function (page) {

        var id = page.query.id;
        get_offer(id);
        
});

myApp.onPageInit('mapview', function (page) {

      var id = page.query.id;  
      get_initial_map_data(id);
      // get_owl_map();
      get_top_location(id);

      $('#whatshappening_map').attr('onclick', 'get_initial_map_data('+id+')');

      if(Lockr.get('is_logged_in')){
        $('.home').attr('href','location.html');
      }else{
        $('.home').attr('href','index.html');
      }

      var owl = $("#owl-demo-map");
      owl.owlCarousel({

      items : 5, //10 items above 1000px browser width
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // 3 items betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0;
      itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option

      });


      $(document).on('click', '.owl-item', function(){
            n = $(this).index();
            console.log(n)
            $('.owl-wrapper').trigger('owl.goTo', n);
     });
});

myApp.onPageInit('listview', function (page) {

        

          if(Lockr.get('is_logged_in')){
                 // alert('logged in');
                 $('.home').attr('href','location.html');
          }else{
                // alert('NOT logged in');
                $('.home').attr('href','index.html');
          }

          var owl = $("#owl-demo-list");

          owl.owlCarousel({

          items : 5, //10 items above 1000px browser width
          itemsDesktop : [1000,5], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,3], // 3 items betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 0;
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option

          });

          // owl-item

          $(document).on('click', '.tab', function(){
                
                n = $(this).index();
                console.log(n)
                $('.owl-wrapper').trigger('owl.goTo', n);
          });


          $(document).on('click', '.category', function(){
                
                // var default_id = $(this).attr('data-id');
                // console.log(id);

                var number_id = Number($(this).attr('data-id'));

                console.log(number_id);

                // alert('done');

                $('.owl-wrapper').trigger('owl.goTo', number_id);

                $('.owl-item').removeClass('active-tab');
                $('.tab').removeClass('active-tab');
                $('#list-tab-'+number_id).addClass('active-tab');

          });

          var id = page.query.id;
          get_top_location(id);
          
          get_event_type();

});

myApp.onPageInit('club_types', function (page) {

    if(Lockr.get('is_logged_in')){
         // alert('logged in');
         $('.home').attr('href','location.html');
    }else{
        // alert('NOT logged in');
        $('.home').attr('href','index.html');
    }

});


myApp.onPageInit('club_list', function (page) {

    // var id = page.query.id;
    // get_top_location(id);
    
    var type = page.query.type;
    get_club_list(type);
    
});

myApp.onPageInit('club', function (page) {

    var id = page.query.id;
    get_club(id);

});

myApp.onPageInit('index', function (page) {
  

});

myApp.onPageInit('search', function (page) {

  get_clubs();

});

myApp.onPageInit('invite', function (page) {

  
  var id = Lockr.get('id');
  get_ref_code(id);

});

myApp.onPageInit('login', function (page) {

  if(Lockr.get('email')){

    var email = Lockr.get('email');
    $('#email').val(email);

    console.log(email);

  }

});


myApp.onPageInit('notification', function (page) {


    get_notification();

});





