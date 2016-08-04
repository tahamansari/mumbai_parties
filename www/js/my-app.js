// Initialize app
var myApp = new Framework7({

    cache:false,
    modalTitle:"Mumbai Parties",
    smartSelectOpenIn:'picker',
    swipeBackPage:false,

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

var mainView = myApp.addView('.view-main', {
    
    dynamicNavbar: true
});


$$(document).on('deviceready', function() {

    console.log("Device is ready!");

    // console.log(myApp.params.swipePanel);
    // console.log("initial value"+Lockr.get("is_logged_in"));

});

myApp.onPageInit('location', function (page) {

    get_location();

    if(Lockr.get("is_logged_in")){

       $("#signin-div").html("<h2 class='username'>"+Lockr.get("name")+"</h2>");
       $("#signout-div").css("display","block");

    }
    
});

myApp.onPageInit('mapview', function (page) {

        var id = page.query.id;        
        get_initial_map_data(id);

        $("#owl-demo-map").owlCarousel({
      
             items : 4,
             itemsDesktop : [1199,3],
             itemsDesktopSmall : [979,3],
        });
});

myApp.onPageInit('entitie', function (page) {

        var id = page.query.id;   
        get_entitie(id);
        
});


myApp.onPageInit('index', function (page) {

  console.log("value in index "+Lockr.get("is_logged_in"));

});

myApp.onPageInit('register', function (page) {

    // myApp.myApp.alert('this is login page');

});



// function onMapInit(map) {

// }

myApp.onPageInit('listview', function (page) {

      get_event_type();

      $("#owl-demo-listview").owlCarousel({

         items : 4,
         itemsDesktop : [1199,3],
         itemsDesktopSmall : [979,3]
   
      });
      
});



myApp.onPageInit('event', function (page) {

        var id = page.query.id;
        get_event(id);
        
});

