function initilize(){


	myApp.alert("initiliEd");

}


function check_age(age){


	// myApp.alert($('#'+age).val());
	var age = $('#'+age).val();

	// myApp.alert(age);

	if(isNaN(age)){

		myApp.alert("age should be numeric");
		$('[name="age"]').val("");
		return false;
	}

}

$(document).on('click','.tab',function(event){

	$('.tab').removeClass('active-tab');
	$(this).addClass('active-tab');
	 
})



function call(para1){

	window.open('tel:'+para1);


}

function get_direction(para1,para2){

	console.log(para1,para2);
	

	// alert("called");
	directions.navigateTo(para1,para2); // latitude, longitude
}


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	if(Lockr.get("is_logged_in")){

       mainView.router.loadPage("location.html");
       console.log("user is logged in");

    }else{

        console.log("user is not logged in");
    }


    document.addEventListener("backbutton", function(e) {
        e.preventDefault();
        var page = myApp.getCurrentView().activePage;
        myApp.hideIndicator();
        if (page.name == "index") {
            myApp.confirm('would you like to exit app.', function() {
                navigator.app.clearHistory();
                // gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
                navigator.app.exitApp();
            });
        } else {
            mainView.router.back({});
        }
    }, false);

    // gaPlugin = window.plugins.gaPlugin;
    // gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-78959047-1", 10);
}


var login = function () {

    if (!window.cordova) {

        var appId = prompt("Enter FB Application ID", "");
        facebookConnectPlugin.browserInit(appId);
    }
    
    facebookConnectPlugin.login( ["email"],
    function (response) { 
        // alert(JSON.stringify(response));

        if(response.status == "connected"){

        	Lockr.set("name","Facebook");
			Lockr.set("is_logged_in",true);

			myApp.alert("Success");				
			mainView.router.loadPage("location.html");

        }else{

        	alert("Invalid Login");
        }
    },
    function (response) { 
    	alert(JSON.stringify(response)) 
    });
}


var getStatus = function () { 
    facebookConnectPlugin.getLoginStatus( 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
}
var logout = function () { 

    facebookConnectPlugin.logout( 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
}

function current_date(){

	var d = new Date();

	var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
	var day = d.getDate();
	var month = m[d.getMonth()];

	return day+" "+month;

}

