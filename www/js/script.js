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

function check_mobile(mobile){
    
    var mobile = $('#'+mobile).val();
    if(isNaN(mobile)){

        myApp.alert("Mobile Number Should Be Numeric");
        $('[name="mobile"]').val("");
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


    // alert('device is now ready');
    

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

        if (page.name == "offline") {

                myApp.confirm('would you like to exit app.', function() {
                    navigator.app.clearHistory();
                    navigator.app.exitApp();
                });
                return false;
        }
        
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
    // myApp.alert("No Internet");
    mainView.router.loadPage('offline.html');

}

function current_date(){

    var d = new Date();
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    var day = d.getDate();
    var month = m[d.getMonth()];
    var year = d.getFullYear();

    // 
    return day+" "+month+" "+year;

}

var mylogin = function () {

    alert('facebook clicked');

    var fbLoginSuccess = function (userData) {

        var id = userData['authResponse']['userID'];

        $.ajax({

            url: base_url+'check_user',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
        })
        .done(function(result) {

            if(result['status']=='success'){

                var name = result['data']['first_name'];
                // var result = name.split(" ");

                Lockr.set("id",result['data']['id']);
                Lockr.set("name",name);
                Lockr.set("type","fb");
                Lockr.set("is_logged_in",true);

                mainView.router.loadPage("location.html");

            }else{

                facebookConnectPlugin.api('/me?fields=id,email,name,picture', ["public_profile"],function(result){

                var fb_id = result.id;
                var type = "fb";
                var email = result.email;
                var name = result.name;

                var fb_image_url = result.picture.data.url;

                var nm = name.substring(0, 3);
                var num = Math.floor(1000 + Math.random() * 9000);

                var img_name = fb_image_url.substr(fb_image_url.lastIndexOf('/')+1);


                var ref_code = nm+num;
                var is_redeemed = 0;

                $.ajax({

                    url: base_url+"register/",
                    type:'POST',
                    dataType:'json',
                    data:{

                        fb_id:fb_id,
                        type:type,
                        email: email,
                        name: name,
                        img_name:img_name,
                        ref_code:ref_code,
                        is_redeemed:is_redeemed

                    },
                    success:function(result){

                        if(result.status=='success'){

                            alert('user inserted successfull');

                            Lockr.set("id",result.id);
                            Lockr.set("name",name);

                            $.ajax({

                                url: base_url+"upload_fb/",
                                type:'POST',
                                dataType:'json',
                                data:{

                                    fb_image_url:fb_image_url,
                                    img_name:img_name

                                },
                                success:function(result){


                                    if(result.status=='success'){

                                        alert('image inserted successfull');

                                        var name = result['data']['first_name'];
                                        
                                        Lockr.set("type","fb");
                                        Lockr.set("is_logged_in",true);

                                        mainView.router.loadPage("location.html");
                                    }

                                },
                                error: function(jqXHR, exception) {

                                    alert("No Internet Connection"); mainView.router.loadPage('offline.html');
                                }
                            })


                            
                        }else{
                            alert("user not exists");
                        }

                    },
                    error: function(jqXHR, exception) {

                        alert("No Internet Connection"); mainView.router.loadPage('offline.html');
                    }
                })
            }, 
            function (error) { 
                alert("Failed: " + error);
            }
        );
            }
            
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        
        
    }

    facebookConnectPlugin.login(["public_profile"], fbLoginSuccess, 

        function (error) {
             // + error
            alert("error "+ JSON.stringify(error));
        }
    );

    
}

var getStatus = function () { 
    facebookConnectPlugin.getLoginStatus( 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
}

var logout = function () { 

    facebookConnectPlugin.logout(

        function (response) {  },
        function (response) {  });
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

    $('.single-textbox').append("<div class='col-50'><input class='book-name' type='text' name='single_name'></div>");

}

function dec_single(){

    var quantity = Number($('#single_text').text());
    var amount = Number($('#amount').text());

    quantity -= 1;
    amount -= 1000;

    $('#single_text').text(quantity);
    $('#amount').text(amount);


     $('.single-textbox .col-50:last-child').remove();

    // $('.single-textbox').remove("<div class='col-50'><input class='book-name' type='text' name='single_name'></div>");


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

    $('.couple-textbox').append("<div class='col-50'><input class='book-name' type='text' name='single_name'></div>");


}

function dec_couple(){

    var quantity = Number($('#couple_text').text());
    var amount = Number($('#amount').text());

    quantity -= 1;
    amount -= 2000;

    $('#couple_text').text(quantity);
    $('#amount').text(amount);



     $('.couple-textbox .col-50:last-child').remove();


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

function update_type_gallery() {

    navigator.camera.getPicture(updateprofile, function(message) {
            alert('Try Again');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit:true
    }
        );
}

function update_type_camera() {

    navigator.camera.getPicture(updateprofile, function(message) {
            alert('Try Again');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        allowEdit:true
    }
        );
}


function updateprofile(imageURI) {

    myApp.closeModal('.profile_picker');
    
    var id = Lockr.get('id'); 
    var img_name = imageURI.substr(imageURI.lastIndexOf('/')+1);


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

            // $('#profile_img').attr('src', 'http://casaestilo.in/taha/mp_admin/uploads/'+img_name); 
            imageURI="";
            myApp.closeModal('.update_picker');
            // mainView.router.loadPage('location.html');
            myApp.alert("Profile Updated");


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

function win(r) {

    // console.log("Code = " + r.responseCode);
    // console.log("Response = " + r.response);
    // console.log("Sent = " + r.bytesSent);
    // alert(r.response);
}


function fail(error) {

    // alert("An error has occurred: Code = "+error.code);
}




function upload_type_gallery() {

    navigator.camera.getPicture(uploadprofile, function(message) {
            alert('Try Again');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit:true
    }
        );
}

function upload_type_camera() {

    navigator.camera.getPicture(uploadprofile, function(message) {
            alert('Try Again');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        allowEdit:true
    }
        );
}


function uploadprofile(imageURI) {

    myApp.closeModal('.upload_picker');
    Lockr.set('imageURI',imageURI);

}


$(document).on('click','.notify-toolbar',function(){

    if(Lockr.get('is_logged_in')){

        mainView.router.loadPage('notification.html');

    }else{

        myApp.alert('Sign In Required');
        mainView.router.loadPage('login.html');

    }

});

// function book_login(){

//     if(Lockr.get('is_logged_in')){

//         mainView.router.loadPage('book.html');

//     }else{

//         myApp.alert('Sign In Required');
//         mainView.router.loadPage('login.html');
//     }

// }

$(document).on('click','.home',function(){

    if(Lockr.get('is_logged_in')){

        mainView.router.loadPage('location.html');

      }else{
        mainView.router.loadPage('index.html');
    }


})

function changedate(){

    myApp.showIndicator();

    var date = $('.date').val();
    $('.date-text').html(moment(date).format("Do MMM YYYY"));

    // id,eventtype,date
    var loc_id = Lockr.get('loc_id');
    var event_type = $('#scroll-data-attr').attr('data-id');


     $.ajax({

        type:"POST",
        url: base_url+"get_event_data_bydate/",
        dataType:"json",
        data:{

            loc_id:loc_id,
            event_type:event_type,
            date:date
        },
        success:function(result){

            console.log(result);

            var html = "";
            if(result['status']=="success"){


                $.each(result['data'],function(key,value) {

                    html +="<div data-id="+value.event_id+" class='card demo-card-header-pic get-event' style='margin: 0;margin-bottom: 0px;width:100%'>"+
                              "<div style='background-image:url("+img_url+value.image+")' valign='bottom' class='card-header no-border'>"+
                              "<h3 class='no-mar list-name'>"+value.event_name+"</h3>" +
                              "</div>"+
                              "<div class='card-footer color-white'>"+
                                "<span class='footer-left'>@ "+value.name+"</span>"+
                                "<span class='footer-text'>"+value.time_event_start+" to "+value.time_event_ends+"</span>"+
                              "</div>"+
                            "</div>";
                });

                $('#cust_event_box').html(html);

                myApp.hideIndicator();


            }else{

                if(result['msg']=="no data"){

                    html +="<h3 class='no-event'>No Event Available</h3>";

                    $('#cust_event_box').html(html);
                    myApp.hideIndicator();


                }else{

                    alert("failed");
                }
            }
        }
    })
}

$(document).on('click','.calender',function(){

    alert('called');
    $('#date').trigger('click');

})
