// Initialize app
var myApp = new Framework7({

    cache:false,
    modalTitle:"Mumbai Parties",
    smartSelectOpenIn:'picker',
    swipeBackPage:false,
    smartSelectSearchbar:true,
    // preloadPreviousPage: false,
    uniqueHistory: true,
    // animateNavBackIcon:true,

    onAjaxStart: function (xhr) {

        // myApp.alert("ajax start");
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {

        // myApp.alert("ajax complet");
        myApp.hideIndicator();
    }
});

var $$ = Dom7;


$$(document).on('pageInit', function (e) {

    var page = myApp.getCurrentView().activePage;

    if (page.name == "index" || page.name =="location") {
        mainView.hideToolbar();
    } else {
        mainView.showToolbar();
    }

      
});


var mainView = myApp.addView('.view-main', {
    
    dynamicNavbar: true
});

myApp.onPageInit('location', function (page) {

    get_location();

    if(Lockr.get("is_logged_in")){

       $("#signin-div").html("<h2 class='username'>"+Lockr.get("name")+"</h2>");
       $("#signout-div").css("display","block");

    }
    
});

myApp.onPageInit('entitie', function (page) {
        // 30
        var id = page.query.id;   
        get_entitie(id);
        
});

myApp.onPageInit('event', function (page) {

        // 73
        var id = page.query.id;
        get_event(id);
        
});

myApp.onPageInit('offer', function (page) {

        // 73
        var id = page.query.id;
        get_offer(id);
        
});

myApp.onPageInit('mapview', function (page) {

        var id = page.query.id;  
        get_initial_map_data(id);

        get_top_location(id);

        $("#owl-demo-map").owlCarousel({
             items : 4,
             itemsDesktop : [1199,3],
             itemsDesktopSmall : [979,3],
        });
});

myApp.onPageInit('listview', function (page) {

      var id = page.query.id;
      get_top_location(id);
      
      get_event_type();

      $("#owl-demo-listview").owlCarousel({

         items : 4,
         itemsDesktop : [1199,3],
         itemsDesktopSmall : [979,3]
   
      });
});

myApp.onPageInit('club_types', function (page) {

    var id = page.query.id;
    get_top_location(id);


});


myApp.onPageInit('club_list', function (page) {

    var id = page.query.id;
    get_top_location(id);
    var type = page.query.type;

    get_club_list(id,type);
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





