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

function check_login(){

    if(Lockr.get("is_logged_in")){

        myApp.pickerModal('.review_picker');

    }else{

        myApp.alert("Sign In Required");
        mainView.router.loadPage('login.html');
    }

    return false;
}


function share(){



    var message = {

        subject: "NeonBuzz App",
        text: "Click the link below to download NeonBuzz",
        url: "https://play.google.com/store/apps/details?id=com.kreaserv.neonbuzz&hl=en"
        // image: image
    };
    
    window.socialmessage.send(message);

    // alert('share');

    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    // var options = {
    //   message: 'share this', // not supported on some apps (Facebook, Instagram)
    //   subject: 'the subject', // fi. for email
    //   files: ['', ''], // an array of filenames either locally or remotely
    //   url: 'https://www.website.com/foo/#bar?a=b',
    //   chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    // }

    // var onSuccess = function(result) {
    //   console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    //   console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    // }

    // var onError = function(msg) {
    //   console.log("Sharing failed with message: " + msg);
    // }

    // window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}

  

  


