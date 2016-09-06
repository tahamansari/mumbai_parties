function initilize(){

	myApp.alert("initiliEd");

}

function check_age(age){

	var age = $('#'+age).val();

	if(isNaN(age)){

		myApp.alert("age should be numeric");
		$('[name="age"]').val("");
		return false;
	}

}

$(document).on('click','.owl-item',function(event){

	$('.tab').removeClass('active-tab');
    $('.owl-item').removeClass('active-tab');
	$(this).addClass('active-tab');
	 
})



function call(para1){

	window.open('tel:'+para1);
}

function get_direction(para1,para2){

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
                navigator.app.exitApp();
            });
        } else {
            mainView.router.back({});
        }
    }, false);


    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

}

function onOnline() {
    // Handle the online event
    // myApp.alert("online");
    // mainView.
}

function onOffline() {
    // Handle the online event
    myApp.alert("No Internet");

}

// function getImage() {
//     // Retrieve image file location from specified source
//     navigator.camera.getPicture(uploadPhoto, function(message) {

//             alert('get picture failed');

//         },{
//             quality: 50, 
//             destinationType: navigator.camera.DestinationType.FILE_URI,
//             sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
//         }
//     );

// }

// function uploadPhoto(imageURI) {

//     var options = new FileUploadOptions();
//     options.fileKey="file";
//     options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
//     options.mimeType="image/jpeg";

//     var params = new Object();
//     params.value1 = "test";
//     params.value2 = "param";

//     options.params = params;
//     options.chunkedMode = false;

//     var ft = new FileTransfer();
//     ft.upload(imageURI, "http://yourdomain.com/upload.php", win, fail, options);
// }

// function win(r) {
//     console.log("Code = " + r.responseCode);
//     console.log("Response = " + r.response);
//     console.log("Sent = " + r.bytesSent);
//     alert(r.response);
// }

// function fail(error) {
//     alert("An error has occurred: Code = " = error.code);
// }

// var fbLoginSuccess = function (userData) {
// alert("UserInfo: " + JSON.stringify(userData));\

// }

// function open_facebook(){

//     facebookConnectPlugin.login(["public_profile"],
//         fbLoginSuccess,
//         function (error) { alert("" + error) }
//     );                                                                                                                                                                                                              
// }
// 


var login = function () {

    var fbLoginSuccess = function (userData) {

        facebookConnectPlugin.api('/me?fields=id,email,name,picture', ["public_profile"],

            function (result) {

             // alert("Result: " + JSON.stringify(result));
                alert(result.id);
                alert(result.email);
                alert(result.name);
                alert(result.picture.data); 

            }, 
            function (error) { 
                alert("Failed: " + error);
            }
        );
    }

    facebookConnectPlugin.login(
        ["public_profile"], 
        fbLoginSuccess, 
        function (error) { 
            alert("" + error);
        }
    );


   //  if (!window.cordova) {

   //      var appId = prompt("Enter FB Application ID", "");
   //      facebookConnectPlugin.browserInit(appId);
   //  }
    
   //  facebookConnectPlugin.login( ["email"],
   //  function (response) { 

   //      if(response.status == "connected"){


   //          facebookConnectPlugin.api('http://graph.facebook.com/', ["public_profile", "user_birthday"], graphsuccess(), graphfail());

   //      	Lockr.set("name","Facebook");
   //          Lockr.set("type","fb");
			// Lockr.set("is_logged_in",true);

			// myApp.alert("Success");				
			// mainView.router.loadPage("location.html");

   //      }else{

   //      	alert("Invalid Login");
   //      }
   //  },
   //  function (response) { 
   //  	alert(JSON.stringify(response)) 
   //  });
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


function share(code){

    var message = {

        subject: "Mumbai Parties",
        text: "Your Reference Code Is - "+code
        // url: "https://play.google.com/store/apps/details?id=com.kreaserv.neonbuzz&hl=en"
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

function inc_single(){

    $("#dec_single").prop('disabled', false);
    var quantity = Number($('#single_text').text());
    var amount = Number($('#amount').text());

    quantity += 1;
    amount += 1000;
    
    $('#single_text').text(quantity);
    $('#amount').text(amount);

}

function dec_single(){

    var quantity = Number($('#single_text').text());
    var amount = Number($('#amount').text());

    quantity -= 1;
    amount -= 1000;

    $('#single_text').text(quantity);
    $('#amount').text(amount);

    if(quantity == 0){
        $("#dec_single").prop('disabled', true);
        return false;
    }

}

function inc_couple(){

    $("#dec_couple").prop('disabled', false);

    var quantity = Number($('#couple_text').text());
    var amount = Number($('#amount').text());
    
    quantity += 1;
    amount += 2000;

    $('#couple_text').text(quantity);
    $('#amount').text(amount);

}

function dec_couple(){

    var quantity = Number($('#couple_text').text());
    var amount = Number($('#amount').text());

    quantity -= 1;
    amount -= 2000;

    $('#couple_text').text(quantity);
    $('#amount').text(amount);

    if(quantity == 0){
        $("#dec_couple").prop('disabled', true);
        return false;
    }

}

var tbl_count = 0;


function inc_table(){

    $("#dec_table").prop('disabled', false);

    var quantity = Number($('#table_text').text());
    var amount = Number($('#amount').text());

    if(tbl_count==0){
        quantity += 2;
        amount += 4000;
        tbl_count++;
    }else{
        quantity = quantity+1;
        amount += 2000;
    }
    $('#table_text').text(quantity);
    $('#amount').text(amount);

}

function dec_table(){

    var quantity = Number($('#table_text').text());
    var amount = Number($('#amount').text());

    if(quantity == 2){
        quantity -= 2;
        amount -= 4000;
        tbl_count = 0;
    }else{
        quantity -= 1;
        amount -= 2000;
    }
    $('#table_text').text(quantity);
    $('#amount').text(amount);

    if(quantity == 0){
        $("#dec_table").prop('disabled', true);
        return false;
    }

}


function type_gallery() {
    navigator.camera.getPicture(on_success, on_fail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 720,
        targetHeight: 640,
        correctOrientation: true,
        allowEdit: true,
    });
}

function type_camera() {


    navigator.camera.getPicture(on_success, on_fail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 720,
        targetHeight: 640,
        correctOrientation: true,
        allowEdit: true,
    });
}

function on_success(fileURL) {

    alert('on success');
    var uri = encodeURI(base_url+"uploads");
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var headers = {
        'headerParam': 'headerValue'
    };
    options.headers = headers;
    new FileTransfer().upload(fileURL, uri, upload_success, upload_failed, options);
}

function on_fail(message) {

    alert('on failed');

    alert('Failed because: ' + message);
}

function upload_success(res) {

    alert('on upload success');


    if(res.responseCode == 200) {
        uploaded_image = res.response.replace(/\"/g, "");
        image_from_device = uploaded_image;
        console.log('uploaded_image: ' + uploaded_image);
        // $('#shopper_register-profile_image').val(uploaded_image);
myApp.alert("Image Uploaded Successfully");

    }else{

        myApp.alert('Some error occurred on uploading');
    }
}

function upload_failed(error) {

    alert('on upload failed');


    console.log("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    myApp.alert("Some Error Occured While image upload please try again");
}




// function on_gallery_success(imageData) {

//     myApp.showPreloader('uploading image');
//     alert(fileURL);
//     var uri = encodeURI("http://casaestilo.in/taha/mp_admin/uploads");
//     var options = new FileUploadOptions();
//     options.fileKey = "file";
//     options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
//     options.mimeType = "image/jpeg";
//     var headers = {
//         'headerParam': 'headerValue'
//     };
//     options.headers = headers;
//     new FileTransfer().upload(fileURL, uri, upload_gallery_success, upload_gallery_fail, options);
// }

// function on_gallery_fail(message) {
//     alert('Failed because: ' + message);
// }

// function upload_gallery_success(res) {

//     myApp.hidePreloader();
//     if (res.responseCode == 200) {
//         myApp.alert("Image Uploaded Successfully");
//     } else {

//         myApp.alert('Some error occurred on uploading');
//     }
// }

// function upload_gallery_fail(error) {
//     myApp.hidePreloader();
//     console.log("An error has occurred: Code = " + error.code);
//     console.log("upload error source " + error.source);
//     console.log("upload error target " + error.target);
//     myApp.alert("Some Error Occured While image upload please try again");
// }






