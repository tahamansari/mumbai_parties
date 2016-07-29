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


    console.log("initial value"+Lockr.get("is_logged_in"));



});



myApp.onPageInit('index', function (page) {

        console.log("value in index "+Lockr.get("is_logged_in"));

});

myApp.onPageInit('register', function (page) {

    // myApp.myApp.alert('this is login page');

});



myApp.onPageInit('location', function (page) {

    // console.log('myapp location called');
    get_location();
    
    console.log("value in location "+Lockr.get("is_logged_in"));

    if(Lockr.get("is_logged_in")){

       $("#signin-div").html("<h2 class='username'>"+Lockr.get("name")+"</h2>");
       $("#signout-div").css("display","block");

    }
    
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

myApp.onPageInit('mapview', function (page) {
        
        get_initial_map_data(Lockr.get('loc_id'));

        $("#owl-demo-map").owlCarousel({
      
             items : 4,
             itemsDesktop : [1199,3],
             itemsDesktopSmall : [979,3],
        });
});

myApp.onPageInit('event', function (page) {

        var event_id = Lockr.get("event_id"); 
        // alert("event id is "+event_id);    
        get_event(event_id);


        
});