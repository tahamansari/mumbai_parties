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
            
        }else if(page.name == "location"){

                if(Lockr.get('is_logged_in')){

                    myApp.confirm('would you like to exit app.', function() {
                        navigator.app.clearHistory();
                        navigator.app.exitApp();
                    });

                }else{

                    mainView.router.back({});

                }
        }else{

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


var mylogin = function () {

    alert('fb login clicked');

    var fbLoginSuccess = function (userData) {
        alert("UserInfo: " + JSON.stringify(userData));
    }

    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function (error) { alert("error is " + JSON.stringify(error))}
    );


    // var fbLoginSuccess = function (userData) {
    //     alert('success called');

    //     facebookConnectPlugin.api('/me?fields=id,email,name,picture', ["public_profile"],
    //         function(result){

    //             alert('inside success');
    //             // alert(JSON.stringify(result));

    //             // var fb_id = result.id;
    //             // var type = "fb";
    //             // var email = result.email;
    //             // var name = result.name;

    //             // var nm = name.substring(0, 3);
    //             // var num = Math.floor(1000 + Math.random() * 9000);

    //             // var ref_code = nm+num;
    //             // var is_redeemed = 0;

    //             // $.ajax({

    //             //     url: base_url+"register/",
    //             //     type:'POST',
    //             //     dataType:'json',
    //             //     data:{

    //             //         fb_id:fb_id,
    //             //         type:type,
    //             //         email: email,
    //             //         name: name,
    //             //         ref_code:ref_code,
    //             //         is_redeemed:is_redeemed

    //             //     },
    //             //     success:function(result){

    //             //         alert('insert success');

    //             //         if(result.status=='success'){

    //             //             // if(Lockr.get('imageURI')){

    //             //             //     alert('true');
                                
    //             //             //     // var options = new FileUploadOptions();
    //             //             //     // options.fileKey="file";
    //             //             //     // options.fileName=img_name;
    //             //             //     // options.mimeType="image/jpeg";
    //             //             //     // options.chunkedMode = false;
    //             //             //     // var ft = new FileTransfer();
    //             //             //     // ft.upload(imageURI, base_url+"profileupload", win, fail, options);

    //             //             //     // Lockr.get('imageURI');
    //             //             //     // Lockr.rm('imageURI');

    //             //             // }else{

    //             //             //     alert('false');
    //             //             // }

    //             //             Lockr.set("id",result.id);
    //             //             Lockr.set("name",result.name);
    //             //             Lockr.set("email",result.email);
                            

    //             //             Lockr.set("is_logged_in",true);

    //             //             myApp.alert("Success");             
    //             //             mainView.router.loadPage("location.html");
    //             //         }

    //             //     },
    //             //     error: function(jqXHR, exception) {

    //             //         alert("error");
    //             //     }
    //             // })
    //         }, 
    //         function (error) { 
    //             alert("Failed: " + error);
    //         }
    //     );
    // }

    // facebookConnectPlugin.login(["public_profile"], fbLoginSuccess, 

    //     function (error) {

    //         alert("error is " + error);
    //     }
    // );

    
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

    navigator.camera.getPicture(uploadPhoto, function(message) {
            alert('get picture failed');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit:true
    }
        );
}

function type_camera() {

    navigator.camera.getPicture(uploadPhoto, function(message) {
            alert('get picture failed');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        allowEdit:true
    }
        );
}


function uploadPhoto(imageURI) {

    var id = Lockr.get('id'); 
    var page = myApp.getCurrentView().activePage;
    var img_name = imageURI.substr(imageURI.lastIndexOf('/')+1);

    if(page.name == 'register'){

        Lockr.set('imageURI',imageURI);

    }else{

        $.ajax({
            url: base_url+'update_profile',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                img_name:img_name
            },
        })
        .done(function(result) {

              if(result['status']=='success'){

                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=img_name;
                options.mimeType="image/jpeg";
                options.chunkedMode = false;
                var ft = new FileTransfer();
                ft.upload(imageURI, base_url+"upload_profile", win, fail, options);

                myApp.alert("Profile Updated");
                myApp.closeModal('.profile_picker');

              }else{
                alert('failed');
              }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }
    
}

function win(r) {

    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    // alert(r.response);
}


function fail(error) {

    alert("An error has occurred: Code = "+error.code);
}


$(document).on('click','.notify-toolbar',function(){

    if(Lockr.get('is_logged_in')){

        mainView.router.loadPage('notification.html');

    }else{

        myApp.alert('Sign In Required');
        mainView.router.loadPage('login.html');

    }

});





