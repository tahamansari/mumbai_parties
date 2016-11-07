var base_url = "http://casaestilo.in/taha/mp_admin/index.php/Api/";
var img_url = "http://mumbaiparties.com/assets/uploads/";

var casa_img_url = "http://casaestilo.in/taha/mp_admin/assets/img/";
var profile_img_path = "http://localhost:8888/mp_back/mumbai_parties/www/img/uploads/";

// var scroll_amount = 250;
// var offset = 0;

$(document).ready(function(){
	
	// Lockr.flush();
	// mainView.hideToolbar();
	// alert('doc is ready');

	// // Lockr.flush();
	// var arr = Lockr.getAll();
	// alert('lockr is '+arr);

});

function isEmail(email) {

	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
}

var profile;

$(document).on('click','#register_button',function(event){

	event.preventDefault();

	// alert('clcked');

	if($('[name="name"]').val() ==""){

		$('[name="name"]').css("border-bottom","1px solid red");
		myApp.alert("name required");
		return false;

	}else{

		$('[name="name"]').css("border-bottom","none");
		var name = $('[name="name"]').val().trim();
	}

	if($('[name="email"]').val() == ""){

		$('[name="email"]').css("border-bottom","1px solid red");
		myApp.alert("email required");
		return false;

	}else if(!isEmail($('[name="email"]').val())){

		$('[name="email"]').css("border-bottom","1px solid red");
		myApp.alert("invalid email");
		return false;

	}else{

		$('[name="email"]').css("border-bottom","none");
		var email = $('[name="email"]').val().trim();

	}

	if($('[name="password"]').val() ==""){

		$('[name="password"]').css("border-bottom","1px solid red");
		myApp.alert("password required");
		return false;

	}else{

		$('[name="password"]').css("border-bottom","none");
		var password = $('[name="password"]').val().trim();

	}

	if($('[name="confirm_password"]').val() ==""){

		$('[name="confirm_password"]').css("border-bottom","1px solid red");
		myApp.alert("confirm_password required");
		return false;

	}else if($('[name="password"]').val() != $('[name="confirm_password"]').val()){

		$('[name="confirm_password"]').css("border-bottom","1px solid red");
		myApp.alert("password doesnt match");
		return false;

	}else{

		$('[name="confirm_password"]').css("border-bottom","none");
		var confirm_password = $('[name="confirm_password"]').val().trim();
	}

	if($('[name="age"]').val() ==""){

		$('[name="age"]').css("border-bottom","1px solid red");
		myApp.alert("age required");
		return false;

	}else{

		$('[name="age"]').css("border-bottom","none");
		var age = $('[name="age"]').val().trim();

	}
	
	if($('[name="gender"]').val() ==""){

		$('[name="gender"]').css("border-bottom","1px solid red");
		myApp.alert("gender required");
		return false;

	}else{

		$('[name="gender"]').css("border-bottom","none");
		var gender = $('[name="gender"]').val().trim();

	}

	if($('[name="mobile"]').val() ==""){

		$('[name="mobile"]').css("border-bottom","1px solid red");
		myApp.alert("mobile required");
		return false;

	}else{

		$('[name="mobile"]').css("border-bottom","none");
		var mobile = $('[name="mobile"]').val().trim();
		
	}

	if(Lockr.get('imageURI')){


		var imageURI = Lockr.get('imageURI');
		var img_name = imageURI.substr(imageURI.lastIndexOf('/')+1);

	}else{

		var img_name="user.jpeg";
	}

	var nm = name.substring(0, 3);
	var num = Math.floor(1000 + Math.random() * 9000);

	var ref_code = nm+num;
	var is_redeemed = 0;

	$.ajax({

		url: base_url+"register/",
		type:'POST',
		dataType:'json',
		data:{

			name: name,
			email: email,
			password: password,
			age: age,
			gender:gender,
			mobile: mobile,
			img_name:img_name,
			ref_code:ref_code,
			is_redeemed:is_redeemed

		},
		success:function(result){

			if(result.status=='success'){

				if(Lockr.get('imageURI')){

					var imageURI = Lockr.get('imageURI');
					var img_name = imageURI.substr(imageURI.lastIndexOf('/')+1);

					var options = new FileUploadOptions();
				    options.fileKey="file";
				    options.fileName=img_name;
				    options.mimeType="image/jpeg";
				    options.chunkedMode = false;
				    var ft = new FileTransfer();
				    ft.upload(imageURI, base_url+"upload_profile", s_win, s_fail, options);

				}

				Lockr.rm('imageURI');
				Lockr.set("id",result.id);
				Lockr.set("name",result.name);
				Lockr.set("email",result.email);
				
				Lockr.set("is_logged_in",true);
				mainView.router.loadPage("location.html");

			}else{

				if(result.msg=='email exist'){
					myApp.alert("Email Already Exist");
				}else{
					myApp.alert('failed');
				}

			}

		},
		error: function(jqXHR, exception) {

			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	})

});

function s_win(r) {

    // console.log("Code = " + r.responseCode);
    // console.log("Response = " + r.response);
    // console.log("Sent = " + r.bytesSent);
    // alert("success response is "+r.response);
}

function s_fail(error) {

    // alert("An error has occurred: Code = "+error.code);
}

$(document).on('click','#login_button',function(event){

	event.preventDefault();

	if($('[name="email"]').val() == ""){

		$('[name="email"]').css("border-bottom","1px solid red");
		myApp.alert("email required");
		return false;

	}else if(!isEmail($('[name="email"]').val())){

		$('[name="email"]').css("border-bottom","1px solid red");
		myApp.alert("invalid email");
		return false;

	}else{

		$('[name="email"]').css("border-bottom","none");
		var email = $('[name="email"]').val().trim();
	}

	if($('[name="password"]').val() ==""){

		$('[name="password"]').css("border-bottom","1px solid red");
		myApp.alert("password required");
		return false;
	}else{

		$('[name="password"]').css("border-bottom","none");
		var password = $('[name="password"]').val().trim();
	}

	$.ajax({

		url: base_url+"login/",
		type:'POST',
		crossDomain : true,
		dataType:'json',
		data:{

			email:email,
			password:password
		},
		success:function(result){

			if(result.status=='success'){

				Lockr.set("id",result.id);
				Lockr.set("name",result.name);
				Lockr.set("email",result.email);


				Lockr.set("is_logged_in",true);
				mainView.router.loadPage("location.html");

			}else{

				myApp.alert("Invalid Login");
			}

		},
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	})

});

$(document).on("click","#signout",function(event){

	event.preventDefault();
	
	$("#signin-div").html("<a href='login.html' class='close-panel'> <h2 class='username'>Sign in</h2> </a>");
    $("#signout-div").css("display","none");
    $("#invite_div").css("display","none");
    $("#booking_div").css("display","none");

    $("#profile_picker").removeClass('open-picker close-panel');



    $('#profile_img').attr('src','http://casaestilo.in/taha/mp_admin/uploads/user.jpeg');

    Lockr.rm('is_logged_in');

    Lockr.rm('id');
    Lockr.rm('name');

	if(Lockr.get('type')=="fb"){
    	Lockr.rm('type');
		logout();
	}

	// myApp.alert("Logged out");
	mainView.router.loadPage("index.html");

});

function get_location(){

  $.ajax({

        url: base_url+"get_location/",
        type:"POST",
        dataType:'json',
        crossDomain : true,
        success:function(result){

            console.log(result);

 			if(result['status']=="success"){

 				  var select = "<option value=''>Select Location</option>";
		          $.each(result['data'], function(key,value){

		                select += "<option value='"+value.id+"'>"+value.name+"</option>";

		          });
		          $('.select_location').html(select);

 			}else{

 				if(result['msg']=="no data"){
 					alert("no data");
 				}else{
 					alert("failed");
 				}
 			}
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
    })
}

$(document).on('change','#map_top_select',function(){

	var id = $("#map_top_select").val();

 	Lockr.set('loc_id',id);

 	$('.owl-wrapper').trigger('owl.goTo', 0);
 	$('.tab').removeClass('active-tab');
    $('.owl-item').removeClass('active-tab');

	$('#whatshappening_map').addClass('active-tab');


	get_initial_map_data(id);


});

$(document).on('change','#list_top_select',function(){

	var id = $("#list_top_select").val();

 	Lockr.set('loc_id',id);

 	$('.owl-wrapper').trigger('owl.goTo', 0);
 	$('.tab').removeClass('active-tab');
    $('.owl-item').removeClass('active-tab');
    
	$('#whatshappening_list').addClass('active-tab');

	get_event_type();

});

function get_top_location(id){

  $.ajax({

        url: base_url+"get_location/",
        type:"POST",
        dataType:'json',
        crossDomain : true,
        success:function(result){

            console.log(result);

 			if(result['status']=="success"){

 				  var select = "";
		          $.each(result['data'], function(key,value){
	          		if(value.id == id){
	          			select += "<option selected value='"+value.id+"'>in "+value.name+"</option>";
	          		}else{
	          			select += "<option value='"+value.id+"'>in "+value.name+"</option>";
	          		}
		          });

		          // $('#list_view_link').attr("href","listview.html?id="+id);
		          // $('#map_view_link').attr("href","mapview.html?id="+id);

		          // $('#bottom-select').attr("href","club_types.html?id="+id);

		          $('.top-select').html(select);

 			}else{

 				if(result['msg']=="no data"){
 					alert("no data");
 				}else{
 					alert("failed");
 				}
 			}
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
    })
}

$(document).on('change','.select_location',function(){

	var id = $(".select_location").val();
	Lockr.set('loc_id',id);
	mainView.router.loadPage('mapview.html');

});

function initial_marker_clicked_event(id){
	
	mainView.router.loadPage('entitie.html?id='+id);
}

 // //Map display nad plot markers
 //        var map;
 //        var image;
 //        var marker, i;
 //        var MY_MAPTYPE_ID = 'mumbai_parties';
 //        function initialize(id){

 //            $("#map-canvas").show();
 //            var lat = $("#latitute").val();
 //            var lon = $("#longitute").val();
 //            var zm = $("#zoom").val();
 //            var zoomd = parseInt(zm);
 //            map = new google.maps.Map(document.getElementById('map-canvas'), {
 //                zoom: zoomd,	
 //                center: new google.maps.LatLng(lat, lon),
 //                mapTypeControlOptions: {
 //                      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
 //                    },
 //                    mapTypeId: MY_MAPTYPE_ID
 //            });
 //            var styles = [
 //                {
 //                featureType: 'all',
 //                elementType: 'all',
 //                  stylers: [
 //                    { hue: '#0800ff' },
 //                    { invert_lightness: 'true' },
 //                    { saturation: -100 }
 //                  ]
 //                },
 //                {
 //                featureType: 'all',
 //                elementType: 'labels.icon',
 //                  stylers: [
 //                    { visibility: 'off' }
 //                  ]
 //                },
 //                {
 //                featureType: 'all',
 //                elementType: 'labels.text',
 //                  stylers: [
 //                    { visibility: 'off' }
 //                  ]
 //                },
 //                {
 //                featureType: 'road.arterial',
 //                elementType: 'labels',
 //                  stylers: [
 //                    { visibility: 'on' }
 //                  ]
 //                },
 //            ];
 //            var styledMapOptions = {
 //                name: 'Mumbai Parties'
 //            };
 //            var customMapType = new google.maps.StyledMapType(styles, styledMapOptions);
 //            map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
 //            $.ajax({
 //                url:'http://mumbaiparties.com/index.php/api/get_entities_list/',
 //                type: 'post',
 //                crossDomain:true,
 //                data: {
 //                    id : id
 //                },
 //                success: function(data){
 //                    console.log(data);
 //                    $.each(data, function(index, value){
 //                        var v = value.latitude;
 //                        var s = value.longitude;
 //                        var bar = value.entity_name;
 //                        console.log(v+' '+s);
 //                        var eventtype = $('#filter_id').val();
                        
 //                        //google.maps.Marker
 //                        var marker1 = new google.maps.Marker({
 //                            position: new google.maps.LatLng(v, s),
 //                            map: map,
 //                            // icon: 'img/party-meter.gif',
 //                            icon: value.marker,
 //                            labelContent: bar,
 //                            labelAnchor: new google.maps.Point(-10, 20),
 //                            labelClass: value.css,
 //                            labelInBackground: false
 //                        });
                        
 //                        var marker = new MarkerWithLabel({
 //                            position: new google.maps.LatLng(v, s),
 //                            map: map,
 //                            // icon: 'img/party-meter.gif',
 //                            icon: value.marker,
 //                            labelContent: bar,
 //                            labelAnchor: new google.maps.Point(-10, 20),
 //                            labelClass: value.css,
 //                            labelInBackground: false
 //                        });
                        
 //                        google.maps.event.addListener(marker, 'click', function(marker, i) {
 //                            geteventsbyentity(value.id);
 //                        });
                        
 //                        google.maps.event.addListener(marker1, 'click', function(marker, i) {
 //                            geteventsbyentity(value.id);
 //                        });
 //                    });
 //                }
 //            })
 //            $('.loader').fadeOut();
 //        }






function get_initial_map_data(id){

	$('#map').html('<img style="margin: 25%;text-align:center;" width="50%" src="img/logo.png">');

	$.ajax({

		type:"POST",
		url:base_url+"get_initial_map_data/",
		dataType:'json',
		data:{

			id:id
		},
		success:function(result){

			console.log(result);

			if(result['status'] == "success"){

		    var map = new google.maps.Map(document.getElementById('map'), {
		      zoom: 14,
		      center: new google.maps.LatLng(result['center'][0]['latitute'], result['center'][0]['longitute']),
		      mapTypeId: google.maps.MapTypeId.ROADMAP,
		      disableDefaultUI: true
		    });



		    var styles = [
                {
                featureType: 'all',
                elementType: 'all',
                  stylers: [
                    { hue: '#0800ff' },
                    { invert_lightness: 'true' },
                    { saturation: -100 }
                  ]
                },
                {
                featureType: 'all',
                elementType: 'labels.icon',
                  stylers: [
                    { visibility: 'off' }
                  ]
                },
                {
                featureType: 'all',
                elementType: 'labels.text',
                  stylers: [
                    { visibility: 'off' }
                  ]
                },
                {
                featureType: 'road.arterial',
                elementType: 'labels',
                  stylers: [
                    { visibility: 'on' }
                  ]
                },
            ];


			map.setOptions({styles: styles});

		    var marker,i;

	        $.each(result['data'],function(key, value) {

	          if(value.rating < 5){

	          	var image = casa_img_url+"party-meter1.gif";

	          }else if(value.rating<10){

				var image = casa_img_url+"party-meter2.gif";

	          }else{

	          	var image = casa_img_url+"party-meter3.gif";

	          }


		      marker = new google.maps.Marker({
		      	
		        position: new google.maps.LatLng(value.latitude,value.longitude),
		        map: map,
		        icon: image,
		        optimized: false,


		      });

		      	var marker1 = new MarkerWithLabel({
			         position: new google.maps.LatLng(value.latitude,value.longitude),
			         map: map,
			        icon:img_url+value.image,
			         labelContent: value.name,
			         labelAnchor: new google.maps.Point(22, 0),
			         labelClass: "labels", // the CSS class for the label
			         labelStyle: {opacity: 0.75}
			       });



		   //    var content = value.name; 
			  // var infowindow = new google.maps.InfoWindow()
    	// 	  infowindow.setContent(content);
		   //    infowindow.open(map,marker);


		      marker.addListener('click', function() {
		          initial_marker_clicked_event(value.id);
		      });

			});
			 
			}else{

				if(result['msg']=="no data"){

					alert("no data");

				}else{

					alert("failed");
				}
				
			}
		},
		error: function(jqXHR, exception) {
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	});
}

function get_entitie(id){

	$.ajax({
		url: base_url+"get_entitie/",
		type: 'POST',
		crossDomain: true,
		dataType: 'json',
		data: {
			id: id
		},
		success: function(result){

			if(result['status']=="success"){

				var entitie_heading = "<h3 class='no-mar' style='color: yellow;padding: 10px;'>"+
							result['entitie']['name']+
	                           "<br>"+
	                           "<i class='fa fa-star' aria-hidden='true'></i>"+
	                           "<i class='fa fa-star' aria-hidden='true'></i>"+
	                           "<i class='fa fa-star' aria-hidden='true'></i>"+
	                        "</h3>";
	            $("#entitie_heading").html(entitie_heading);

	            var entitie_call = "<br>...<i class='fa fa-phone' onclick='call("+result['entitie']['bar_contact']+")' style='font-size: 30px;color: #03A9F4;' aria-hidden='true'></i>";
		        $("#entitie_call").html(entitie_call);

	            var entitie_address = "<p>"+result['entitie']['address']+"</p>";
	            $("#entitie_address").html(entitie_address);

	            var entitie_direction = "<i class='fa fa-map-marker'  onclick='get_direction("+result['entitie']['latitude']+","+result['entitie']['longitude']+")' aria-hidden='true'></i><p clas='no-mar'>Get Direction</p>";
		        $("#entitie_direction").html(entitie_direction);

	            var entitie_timming = "<p>Open from "+result['entitie']['open_hours']+" to "+result['entitie']['closing_hours']+"</p>";
	            $("#entitie_timming").html(entitie_timming);				
				

				var menu_data = "";
				if(result['menu_images'] == "no data"){
					$(".menu_data").html("No Menu Available");
				}else{

					var img_count = 0;
					$.each(result['menu_images'],function(key,value){

						img_count++;
						if(img_count==3){
							menu_data+="<div class='menu-box' style='text-align: center;margin: auto;'><img class='addicon' onclick='loadmoremenu("+result['entitie']['id']+")' style='padding:5px' width='100%' height='100%' src='img/plus.ico' alt='no img'></div>";
							return false;
						}

						menu_data += "<div class='menu-box'><a href='http://mumbaiparties.com/assets/uploads/"+value.url+"' class='fancybox'><img style='padding:5px' width='100%' height='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no img'></a></div>";
					})

					$(".menu_data").html(menu_data);
				}

				var entitie_events = "";
				if(result['events'] == "no data"){
					$("#entitie_events").html("No Event Available");
				}else{

					$.each(result['events'],function(key,value){

						entitie_events += "<div data-id='"+value.event_id+"' class='card demo-card-header-pic get-event' style='margin: 0;margin-bottom: 2px;width:100%'>"+

                          "<div style='background-image:url("+img_url+value.image+")' valign='bottom' class='card-header no-border'>"+
                          "<h3 class='no-mar list-name'>"+value.event_name+"</h3>"+
                          "</div>"+
                         
                          "<div class='card-footer color-white'>"+
                            "<span class='footer-text'>"+value.name+"</span>"+
                            "<span class='footer-text'>"+value.time_event_start+" to "+value.time_event_ends+"</span>"+
                          "</div>"+
                        "</div>";
					})

					$("#entitie_events").html(entitie_events);
				}

				var entitie_offers = "";
				if(result['offers'] == "no data"){
					$("#entitie_offers").html("No Offers Available");

				}else{

					$.each(result['offers'],function(key,value){

						entitie_offers += "<div data-id='"+value.offer_id+"' class='card demo-card-header-pic get-offer' style='margin: 0;margin-bottom: 2px;width:100%'>"+

                          "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
                          "<h3 class='no-mar list-name'>"+value.offer_name+"</h3>"+
                          "</div>"+
                         
                          "<div class='card-footer color-white'>"+
                            "<span class='footer-text'>"+value.name+"</span>"+
                            "<span class='footer-text'>"+value.start_time+" to "+value.end_time+"</span>"+
                          "</div>"+
                        "</div>";
					})

					$("#entitie_offers").html(entitie_offers);
				}

				var entitie_reviews = "";
				if(result['reviews'] == "no data"){

					$("#entitie_reviews").html("No Reviews Available");

				}else{

					$.each(result['reviews'],function(key,value){

		entitie_reviews += "<p style='margin: 5px 0px;'>"+value.created_date+"</p>"+
        "<span>"+value.name+"</span>"+
        "<span style='float:right'>"+
          "<i class='fa fa-star' style='color:yellow' aria-hidden='true'></i>"+
          "<i class='fa fa-star' style='color:yellow' aria-hidden='true'></i>"+
          "<i class='fa fa-star' style='color:yellow' aria-hidden='true'></i>"+
          "<i class='fa fa-star' aria-hidden='true'></i>"+
          "<i class='fa fa-star' aria-hidden='true'></i>"+
        "</span>"+
        "<p>"+value.description+"</p>"+
        "<hr>";

					})

					$("#entitie_reviews").html(entitie_reviews);
				}



			}else{

				if(result['msg'] = "no data"){

					alert("no data");

				}else{

					alert("failed");
				}
			}

		},
		error: function(jqXHR, exception) {
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	});
}

$(document).on('click','.get-offer',function(event){

	var id = $(this).attr('data-id');
	mainView.loadPage('offer.html?id='+id);

});

function get_offer(id){

	$.ajax({

		type: 'POST',
		url: base_url+"get_offer/",
		dataType: 'json',
		data:{
			id: id
		},
		success:function(result){
			
			console.log(result);

			if(result['status'] == "success"){

						var offer_heading = "<h3 class='no-mar' style='color: yellow;padding: 10px;'>"+
									result['offer']['offer_name']+
				                    "</h3>";
				        $("#offer_heading").html(offer_heading);

				       

				        var offer_call = "...<i class='fa fa-phone' onclick='call("+result['offer']['bar_contact']+")' style='padding-top: 10px;font-size: 30px;color: #03A9F4;' aria-hidden='true'></i>";
				        $("#offer_call").html(offer_call);

				        var offer_entitie_address = "<h3 style='margin: 5px 0;color:rgb(78, 236, 78)'>"+result['offer']['name']+"</h3>"+
				                          "<p>"+result['offer']['address']+"</p>";
				        $("#offer_entitie_address").html(offer_entitie_address);

				        var offer_direction = "<i class='fa fa-map-marker' onclick='get_direction("+result['offer']['latitude']+","+result['offer']['longitude']+")' aria-hidden='true'></i><p clas='no-mar'>Get Direction</p>";
				        $("#offer_direction").html(offer_direction);

				        var offer_time = "Open from "+result['offer']['start_time']+" to "+result['offer']['end_time'];
				        $("#offer_time").html(offer_time);

						var week_days =result['offer']['weekly_base'];
						var arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
						var days = "<table style='float: right'>"+
					                  "<thead>"+
					                     "<tr style='font-size: 10px;'>"+
					                        "<th>S</th>"+
					                        "<th>M</th>"+
					                        "<th>T</th>"+
					                        "<th>W</th>"+
					                        "<th>T</th>"+
					                        "<th>F</th>"+
					                        "<th>S</th>"+
					                     "</tr>"+
					                  "</thead>"+
					                  "<tbody>"+
					                     "<tr style='font-size: 10px;'>";
					            for(var i=0;i<arr.length;i++){
									if(week_days.indexOf(arr[i]) > -1){
										days += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";
									}else{
										days += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";
									}
								}
					                     days += "</tr>";
							  days += "</tbody>";
							  days += "</table>";

				        $("#offer_days").html(days);
				        
						var menu_data = "";
						if(result['menu_images'] == "no data"){

							$(".menu_data").html("No Menu Available");

						}else{

							var img_count = 0;
							$.each(result['menu_images'],function(key,value){
								img_count++;
								if(img_count==3){
									menu_data+="<div class='menu-box' style='text-align: center;margin: auto;'><img class='addicon' onclick='loadmoremenu("+result['offer']['id']+")' style='padding:5px' width='100%' height='100%' src='img/plus.ico' alt='no img'></div>";
									return false;
								}
								menu_data += "<div class='menu-box'><a href='http://mumbaiparties.com/assets/uploads/"+value.url+"' class='fancybox'><img width='100%' height='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no img'></a></div>";
							})

							$(".menu_data").html(menu_data);
						}

					}else{

						if(result['msg'] == "no data"){

							alert("no data");

						}else{

							alert("failed");
						}
					}
		}
	});

}



$(document).on('click','.get-event',function(event){

	var id = $(this).attr('data-id');
	mainView.loadPage('event.html?id='+id);

});

function get_event(id){

	$.ajax({

		type: 'POST',
		url: base_url+"get_event/",
		dataType: 'json',
		data:{
			id: id
		},
		success:function(result){
			
			console.log(result);

			if(result['status'] == "success"){

						var event_heading = "<h3 class='no-mar' style='color: yellow;padding: 10px;'>"+
												result['event']['event_name']+
							                "</h3>";
				        $("#event_heading").html(event_heading);

				        var event_call = "...<i class='fa fa-phone' onclick='call("+result['event']['bar_contact']+")' style='padding-top: 10px;font-size: 30px;color: #03A9F4;' aria-hidden='true'></i>";
				        $("#event_call").html(event_call);

				        var entitie_heading = "<h3 style='margin: 5px 0;color: #40e140;'>"+result['event']['name']+"</h3>";
				        $("#entitie_heading").html(entitie_heading);

				        var event_entitie_address = "<span>"+result['event']['address']+"</span>";
				        $("#event_entitie_address").html(event_entitie_address);

				        var event_direction = "<i class='fa fa-map-marker' onclick='get_direction("+result['event']['latitude']+","+result['event']['longitude']+")' aria-hidden='true'></i><p class='no-mar'>Get Direction<p>";
				        $("#event_direction").html(event_direction);

				        var event_description = result['event']['description'];
				        $("#event_description").html(event_description);

				        var event_time = "Open from "+result['event']['time_event_start']+" to "+result['event']['time_event_ends'];
				        $("#event_time").html(event_time);

						var week_days =result['event']['weekly_base'];
						var arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
						var days = "<table style='float: right'>"+
					                  "<thead>"+
					                     "<tr style='font-size: 10px;'>"+
					                        "<th>S</th>"+
					                        "<th>M</th>"+
					                        "<th>T</th>"+
					                        "<th>W</th>"+
					                        "<th>T</th>"+
					                        "<th>F</th>"+
					                        "<th>S</th>"+
					                     "</tr>"+
					                  "</thead>"+
					                  "<tbody>"+
					                     "<tr style='font-size: 10px;'>";
					            for(var i=0;i<arr.length;i++){
									if(week_days.indexOf(arr[i]) > -1){
										days += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";
									}else{
										days += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";
									}
								}
					                     days += "</tr>";
							  days += "</tbody>";
							  days += "</table>";

				        $("#event_days").html(days);

						var menu_data = "";
						if(result['menu_images'] == "no data"){

							$(".menu_data").html("No Menu Available");
						}else{

							var img_count = 0;
							$.each(result['menu_images'],function(key,value){
								
								img_count++;
								if(img_count==3){
									menu_data+="<div class='menu-box' style='text-align: center;margin: auto;'><img class='addicon' onclick='loadmoremenu("+result['event']['id']+")' style='padding:5px' width='100%' height='100%' src='img/plus.ico' alt='no img'></div>";
									return false;
								}
								menu_data += "<div class='menu-box'><a href='http://mumbaiparties.com/assets/uploads/"+value.url+"' class='fancybox'><img width='100%' height='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no img'></a></div>";
							})

							$(".menu_data").html(menu_data);
						}

					}else{

						if(result['msg'] == "no data"){

							alert("no data");

						}else{

							alert("failed");
						}

					}
		}
	});

}

function get_event_type(){

		$.ajax({

		type:"POST",
		url:base_url+"get_event_type/",
		crossDomain:true,
		dataType:'json',
		success:function(result){

			console.log(result);

			if(result['status']=="success"){

				var list = "";
				$.each(result['data'],function(key,value) {
					 
					list += "<div class='col-50 list-box'>"+
							"<a data-id='"+value.id+"' class='get-event-data category'><img src='img/happyhours.jpg' width='100%' alt='img error'>"+
							"<div class='list-overlay'>"+value.event_type+"</div></a>"+
							"</div>";
				})

				$(".date-text").html(current_date());
				$("#cust_event_box").html(list);

				$("#list_date_box").css('display','none');


			}else{

				if(result['msg'] = "no data"){

					alert("no data");

				}else{

					alert("failed");
				}
			}
			
		},
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	})
}

$(document).on('click','.get-event-data',function(event){

	console.log('scroll amount change to 1200');
	scroll_amount = 1200;
	offset=0;

	console.log(scroll_amount);


	 var loc_id = $("#list_top_select").val();
	 var event_type = $(this).attr("data-id");
	 $('#scroll-data-attr').attr('data-id', event_type);

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_event_data/",
	 	dataType:"json",
	 	data:{

	 		loc_id:loc_id,
	 		event_type:event_type
	 	},
	 	success:function(result){

	 		console.log(result);

 			var html = "";
	 		if(result['status']=="success"){

	 			var count=0;
		 		$.each(result['data'],function(key,value) {

		 			console.log(count++);

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
		 		$('#list_date_box').css('display','block');

	 		}else{

	 			if(result['msg']=="no data"){

	 				html +="<h3 class='no-event'>No Event Available</h3>";

		 			$('#cust_event_box').html(html);

	 			}else{

	 				alert("failed");
	 			}
	 		}
	 	}
	})
});


function onscroll_getevent(para1){

	console.log('onscroll called data is '+para1.scrollTop+" "+scroll_amount);


	var loc_id = $("#list_top_select").val();
	var event_type = $("#scroll-data-attr").attr('data-id');

	console.log(para1.scrollTop);

	if(para1.scrollTop > scroll_amount){

		scroll_amount+=1200;
		offset+=11;

	    myApp.showIndicator();

		console.log('call api for more data');

		$.ajax({

		 	type:"POST",
		 	url: base_url+"get_event_data_on_scroll/",
		 	dataType:"json",
		 	data:{

		 		loc_id:loc_id,
		 		event_type:event_type,
		 		offset:offset
		 	},
		 	success:function(result){

		 		console.log(JSON.stringify(result));

		 		if(result['status']=="success"){

		 			var html = "";
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

			 		$('#cust_event_box').append(html);

					console.log("scroll amount is "+scroll_amount);


        			setTimeout(myFunction, 200);

		 		}else{

		 			if(result['msg']=="no data"){


		 				console.log('no data available');
			 			scroll_amount+=1200;

						myApp.hideIndicator();

		 			}else{

						myApp.hideIndicator();
		 				alert("failed");
		 			}
		 		}
		 	}
		})
		
	}else{

		console.log('dont call api');
		myApp.hideIndicator();

	}
}

function marker_clicked_event(para1){

	mainView.router.loadPage("event.html?id="+para1);

}

function marker_clicked_offer(para1){

	mainView.router.loadPage("offer.html?id="+para1);
}


$(document).on('click','.get_offers',function(event){

	 var styles = [
                {
                featureType: 'all',
                elementType: 'all',
                  stylers: [
                    { hue: '#0800ff' },
                    { invert_lightness: 'true' },
                    { saturation: -100 }
                  ]
                },
                {
                featureType: 'all',
                elementType: 'labels.icon',
                  stylers: [
                    { visibility: 'off' }
                  ]
                },
                {
                featureType: 'all',
                elementType: 'labels.text',
                  stylers: [
                    { visibility: 'off' }
                  ]
                },
                {
                featureType: 'road.arterial',
                elementType: 'labels',
                  stylers: [
                    { visibility: 'on' }
                  ]
                },
            ];


     var loc_id =  $('#map_top_select').val();

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_offers/",
	 	dataType:"json",
	 	data:{

	 		loc_id:loc_id,
	 	},
	 	success:function(result){

	 		console.log(result);

	 		if(result['status']=="success"){

	 			var map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 14,
			      center: new google.maps.LatLng(result['center']['latitute'], result['center']['longitute']),
			      mapTypeId: google.maps.MapTypeId.ROADMAP,
			      disableDefaultUI: true
			    });

				map.setOptions({styles: styles});

			    var marker,i;

		        $.each(result['data'],function(key, value) {

			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(value.latitude,value.longitude),
			        map: map,
			        // icon:img_url+value.image

			      });

		           var content = value.offer_name; 
				   var infowindow = new google.maps.InfoWindow()

				   infowindow.setContent(content);
			       infowindow.open(map,marker);

			       marker.addListener('click', function() {

					marker_clicked_offer(value.offer_id);

			       });
			      
				});

	 		}else{

	 			if(result['msg']=="no data"){

	 				alert("no data");

	 			}else{

	 				alert("failed");
	 			}
	 		}
	 	},
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	})
});

//revise
$(document).on('click','.get_map_data',function(event){


	$('#map').html('<img style="margin: 25%;text-align:center;" width="50%" src="img/logo.png">');


	 

     var loc_id =  $('#map_top_select').val();
	 var event_type = $(this).attr('data-id');

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_map_data/",
	 	dataType:"json",
	 	data:{

	 		loc_id:loc_id,
	 		event_type:event_type
	 	},
	 	success:function(result){

	 		console.log(result);

	 		if(result['status']=="success"){

	 			var map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 14,
			      center: new google.maps.LatLng(result['center'][0]['latitute'], result['center'][0]['longitute']),
			      mapTypeId: google.maps.MapTypeId.ROADMAP,
			      disableDefaultUI: true
			    });

			    var styles = [
		        {
		        featureType: 'all',
		        elementType: 'all',
		          stylers: [
		            { hue: '#0800ff' },
		            { invert_lightness: 'true' },
		            { saturation: -100 }
		          ]
		        },
		        {
		        featureType: 'all',
		        elementType: 'labels.icon',
		          stylers: [
		            { visibility: 'off' }
		          ]
		        },
		        {
		        featureType: 'all',
		        elementType: 'labels.text',
		          stylers: [
		            { visibility: 'off' }
		          ]
		        },
		        {
		        featureType: 'road.arterial',
		        elementType: 'labels',
		          stylers: [
		            { visibility: 'on' }
		          ]
		        },
		     ];

			    
				map.setOptions({styles: styles});

		        $.each(result['data'],function(key, value) {

			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(value.latitude,value.longitude),
			        map: map,
			        icon:img_url+value.image,
			        

			      });


			      var marker1 = new MarkerWithLabel({
			         position: new google.maps.LatLng(value.latitude,value.longitude),
			         map: map,
			         icon:img_url+value.image,
			         labelContent: value.name,
			         // labelAnchor: new google.maps.Point(22, 0),
			         labelClass: "labels", // the CSS class for the label
			         labelStyle: {opacity: 0.75}
			       });





			      marker.addListener('click', function() {

			          marker_clicked_event(value.event_id);

			      });

				});


	 		}else{

	 			if(result['msg']=="no data"){

	 				// alert("no data");
	 				var map = new google.maps.Map(document.getElementById('map'), {
				      zoom: 14,
				      center: new google.maps.LatLng(19.0760, 72.8777),
				      mapTypeId: google.maps.MapTypeId.ROADMAP,
				      disableDefaultUI: true
				    });

					map.setOptions({styles: styles});


	 			}else{

	 				alert("failed");

	 			}
	 		}
	 	},
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}
	})
});


function get_location_map(){

  $.ajax({

        url: base_url+"get_location/",
        type:"POST",
        crossDomain : true,
        success:function(result){

          console.log(result);

          var json = JSON.parse(result);
          var select = "<option value=''>Select Location</option>";
          // console.log(json);

          $.each(json, function(i){

                select += "<option value='"+json[i]['id']+"'>"+json[i]['name']+"</option>";

          });

          $('#select_location').html(select);
          // console.log("printed value to dropdown");
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}

    })
}

function get_location_list(){

  $.ajax({

        url: base_url+"get_location/",
        type:"POST",
        crossDomain : true,
        success:function(result){

          console.log(result);

          var json = JSON.parse(result);
          
          var select = "<option value=''>Select Location</option>";

          $.each(json, function(i){

                select += "<option value='"+json[i]['id']+"'>"+json[i]['name']+"</option>";

          });

          $('#select_location').html(select);
          // console.log("printed value to dropdown");
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}

    })
}

function get_clubs(){

	$.ajax({

        url: base_url+"get_clubs/",
        type:"POST",
        dataType:'json',
        crossDomain : true,
        success:function(result){

          console.log(result);

          if(result['status']=='success'){

          	  var list = "";
	          $.each(result['data'], function(key,value){


	          		 list+="<li class='search-list'>"+
			                  "<a href='club.html?id="+value.club_id+"' class='item-content no-pad'>"+
			                    "<div class='item-inner'>"+
			                      "<div class='item-title-row'>"+
			                        "<div class='item-title'>"+value.club_name+"</div>"+
			                        "<div class='item-after no-mar'>"+value.club_name+", "+value.city+"</div>"+
			                      "</div>"+
			                    "</div>"+
			                  "</a>"+
			                "</li>";
	          });

	          $('#search_club').html(list);

          }else{

	 			if(result['msg']=="no data"){

	 				alert("no data");

	 			}else{

	 				alert("failed");
	 			}
	 	  }
          
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}

    })
}

$(document).on('click','.go_to_club_list',function(){

	// var loc_id = $("#club_types_top_select").val();
	var type = $(this).attr('data-id');

	// ?id='+loc_id+'&type='+type
	mainView.router.loadPage('club_list.html?type='+type);

});

function get_club_list(type){

	$.ajax({

        url: base_url+"get_club_list/",
        type:"POST",
        dataType:'json',
        crossDomain : true,
        data:{
        	type:type
        },
        success:function(result){

          console.log(result);

          if(result['status']=='success'){

          	  var list = "";
	          $.each(result['data'], function(key,value){

				    list += "<div data-id='"+value.club_id+"' class='card demo-card-header-pic go_to_club'>"+
				            // "style='position:relative;margin: 0;border-bottom: 2px solid white;width:100%;'"+
				              "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
				                    "<div style='position:absolute;top: 30px;right: 0;'>"+

				                      "<div style='position: relative;color: white; margin-bottom: 10px;'>"+
					                      "<img class='ptag' width='90px' src='img/ptag1.png'/>"+
					                      "<span class='span-ptag'>"+value.single_price+"</span>"+
				                      "</div>"+


				                      // "<input type='submit' value='Rs "+value.single_price+"'>"+

				                      "<br>"+

				                      "<div style='position: relative;color: white;'>"+
					                      "<img class='ptag' width='90px' src='img/ptag2.png'/>"+
					                      "<span class='span-ptag'>"+value.couple_price+"</span>"+
				                      "</div>"+

				                      // "<img width='80px' src='img/ptag2.png'/>"+
				                      // "<span>"+value.couple_price+"</span>"+

				                      // "<input type='submit' value='Rs "+value.couple_price+"'>"+

				                    "</div>"+
				                    
				                    "<div class='list-name'>"+
				                      "<h3 class='no-mar' style='float:left'>"+value.club_name+"</h3>"+
				                      "<p style='margin: 0;float:right;'>"+value.opening_hours+" TO "+value.closing_hours+"</p>"+
				                    "</div>"+
				              "</div>"+
				            "</div>";

	          });

	          $('#club_list_box').html(list);

          }else{

	 			if(result['msg']=="no data"){

	 				alert("no data");

	 			}else{

	 				alert("failed");

	 			}
	 	  }
          
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}

    })

}


$(document).on('click','.go_to_club',function(){

	var id = $(this).attr("data-id");
	mainView.router.loadPage('club.html?id='+id);

});

function get_club(id){

	$.ajax({

        url: base_url+"get_club/",
        type:"POST",
        dataType:'json',
        crossDomain : true,
        data:{

        	id:id
        },
        success:function(result){

          console.log(result);

          if(result['status']=='success'){

   			  var club_name = result['data']['club_name'];
	          $('#club_name').html(club_name);

	          var cal_dir = "<i onclick='call("+result['data']['contact']+")' class='fa fa-phone right call' aria-hidden='true'></i>"+ 
                            "<i onclick='get_direction("+result['data']['latitude']+","+result['data']['latitude']+")'  class='fa fa-map-marker right marker' aria-hidden='true'></i>";
	          $('#cal_dir').html(cal_dir);


	          $('#club_add').html(result['data']['address']);
	          $('#club_time').html("Open from "+result['data']['opening_hours']+" to "+result['data']['closing_hours']);
	          $('#club_desc_text').html(result['data']['description']);
	          $('#club_music_text').html(result['data']['music']);


		        var week_days =result['data']['week_days'];

				var arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

				var days = "<table>"+
			                  "<thead>"+
			                     "<tr style='font-size: 10px;'>"+
			                        "<th>SUN</th>"+
			                        "<th>MON</th>"+
			                        "<th>TUE</th>"+
			                        "<th>WED</th>"+
			                        "<th>THU</th>"+
			                        "<th>FRI</th>"+
			                        "<th>SAT</th>"+
			                     "</tr>"+
			                  "</thead>"+
			                  "<tbody>"+
			                     "<tr style='font-size: 10px;'>";

			            var i;   
			            for(i=0;i<arr.length;i++){

							if(week_days.indexOf(arr[i]) > -1){

								days += "<td>OPEN</td>";
							}else{
								days += "<td>CLOSED</td>";
							}
						}
			                     days += "</tr>";
				  days += "</tbody>";
				  days += "</table>";

	          $('#club_timming').html(days);

	          
	          // $('#club_box').html(club);

          }else{

	 			if(result['msg']=="no data"){

	 				alert("no data");

	 			}else{

	 				alert("failed");
	 			}
	 	  }
          
        },
		error: function(jqXHR, exception) {
			
			alert("No Internet Connection"); mainView.router.loadPage('offline.html');
		}

    })

}

function submit_review(){

	var user_id = Lockr.get('id');
	var user_name = Lockr.get('name');

	var entitie_id = $('#submit_review').attr('data-id');
	var star = $('#count').html();
	var description = $('#description').val();
	
	$.ajax({

		url: base_url+'submit_review',
		type: 'POST',
		dataType: 'json',
		data: {

			user_id:user_id,
			user_name:user_name,
			entitie_id:entitie_id,
			star : star,
			description : description
		},
	})
	.done(function(result) {

		var review = "";
		if(result.status == "success"){

			var review = "<p style='margin: 5px 0px;'>"+moment().format("YYYY/MM/DD")+"</p>"+
		        "<span>"+user_name+"</span>"+
		        "<span style='float:right'>"+
		          "<i class='fa fa-star' style='color:yellow' aria-hidden='true'></i>"+
		          "<i class='fa fa-star' style='color:yellow' aria-hidden='true'></i>"+
		          "<i class='fa fa-star' style='color:yellow' aria-hidden='true'></i>"+
		          "<i class='fa fa-star' aria-hidden='true'></i>"+
		          "<i class='fa fa-star' aria-hidden='true'></i>"+
		        "</span>"+
		        "<p>"+description+"</p>"+
		        "<hr>";


		    $("#entitie_reviews").append(review);

        	myApp.closeModal('.review_picker');
			myApp.alert("Review Added");

		}else{

			myApp.alert("Failed");
		}

	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

$(document).on('click', '.get-list-offers', function(event) {

	event.preventDefault();

	var loc_id = $("#list_top_select").val();

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_list_offers/",
	 	dataType:"json",
	 	data:{

	 		loc_id:loc_id,
	 	},
	 	success:function(result){

	 		console.log(result);

	 		if(result['status']=="success"){

	 			var html = "";
		 		$.each(result['data'],function(key,value) {

		 			html +="<div data-id="+value.offer_id+"  class='card demo-card-header-pic get-offer' style='margin: 0;margin-bottom: 2px;width:100%'>"+
			                  "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
			                  "<h3 class='no-mar list-name'>"+value.offer_name+"</h3>" +
			                  "</div>"+
			                 
			                  "<div class='card-footer color-white'>"+
			                    "<span class='footer-text'>@woodside - All Day Bar & Eatery </span>"+
			                    "<span class='footer-text'>"+value.start_time+" to "+value.end_time+"</span>"+
			                  "</div>"+
			                "</div>";
		 		});

		 		$('#event_box').html(html);

	 		}else{

	 			if(result['msg']=="no data"){

	 				alert("no data");

	 			}else{

	 				alert("failed");
	 			}
	 		}
	 	}
	})


});

function get_ref_code(id){

	$.ajax({

		url: base_url+'get_ref_code',
		type: 'POST',
		dataType: 'json',
		data: {

			id: id
		},
	})
	.done(function(result) {

		console.log(result);

	    if(result['status']=="success"){

 			
 			$('#ref_code').html("Your Referal Code "+result['data']['ref_code']);
 			$('#share_anchor').attr('onclick','share("'+result['data']['ref_code']+'")');

 			if(result['data']['is_redeemed']==1){

 				$('#redeem_anchor').css('display','none');
 			}

 		}else{

 			if(result['msg']=="no data"){

 				alert("no data");

 			}else{

 				alert("failed");
 			}
 		}
		
	})

	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function get_points(id){

	$.ajax({
		url: base_url+'get_points',
		type: 'POST',
		dataType: 'json',
		data: {

			id: id
		},
	})
	.done(function(result) {
		
		console.log(result);

	    if(result['status']=="success"){

 			
 			$('#ref_points').html("Points "+result['data']['points']);


 		}else{

 			if(result['msg']=="no data"){

 				alert("no data");

 			}else{

 				alert("failed");
 			}
 		}
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function redeem(ref_code){

    var id = Lockr.get('id');

    $.ajax({
    	url: base_url+'redeem',
    	type: 'POST',
    	dataType: 'json',
    	data: {

    		id:id,
    		ref_code: ref_code
    	},
    })
    .done(function(result) {

    	console.log(result);

    	if(result['status']=='success'){

    		myApp.alert("Points Added");
    		mainView.router.loadPage('location.html');

    	}else{

    		if(result['msg']=="no data"){

    		    myApp.alert("Invalid Referal Code");

 			}else{

 				alert("failed");
 			}
    	}
 		
    })
    .fail(function() {
    	console.log("error");
    })
    .always(function() {
    	console.log("complete");
    });
    

}

// function get_notification(){

// 	alert('called');
// }


function get_notification(){


	$.ajax({

    	url: base_url+'get_notification',
    	type: 'POST',
    	dataType: 'json',
    })
	.done(function(result) {

		console.log(result);
		
		if(result['status']=="success"){

		//  alert('success');
			var html = "";
	 		$.each(result['data'],function(key,value) {

	 			html += "<a href='event.html?id="+value.event_id+"'><div class='row noti-row'>"+
				                "<div class='col-30' style='margin: auto;text-align:center'>"+
				                  "<img class='img-circle noti-img' width='100%' src='img/user.jpeg'>"+
				                "</div>"+
				                "<div class='col-70'>"+
				                  "<p class='no-mar'>"+value.title+"</p>"+
				                  "<p class='mar-5-0 font-12'>"+value.notification_text+"</p>"+
				                  "<p class='no-mar'>"+value.date+"</p>"+
				                "</div>"+
				            "</div></a>";
	 		});

	 		$('#noti-list').html(html);

			

 		}else{

 			if(result['msg']=="no data"){

 				alert("no data");

 			}else{

 				alert("failed");
 			}
 		}
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function sendemail(email){

    // alert("password sent to "+email);

    $.ajax({

    	url: base_url+'sendemail',
    	type: 'POST',
    	dataType: 'json',
    	data:{
    		email:email
    	},   	
    })
	.done(function(result) {
		console.log(result);
		if(result['status']=="success"){

			myApp.alert('Password Sent');
			myApp.closeModal('.forgot_picker')

 		}else{

 			if(result['msg']=="no data"){

 				// alert("no data");
				myApp.alert('Email Not Registered');


 			}else{

 				alert("failed");
 			}
 		}
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});


}




function search_by_date(){

	alert('called');
}


function loadmoremenu(id){
    
    $.ajax({
        url: base_url+'get_more_menu_images',
        type: 'POST',
        dataType: 'json',
        data: {
        	id: id
        },
    })
    .done(function(result) {

    	// alert("response recive");
     //    console.log(result);
     	if(result['status']=='success'){

     		menu_data = "";
 			$.each(result['data'],function(key,value){

				menu_data += "<div class='menu-box'><a href='http://mumbaiparties.com/assets/uploads/"+value.url+"' class='fancybox'><img style='padding:5px' width='100%' height='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no img'></a></div>";
			})

			$(".menu_data").html(menu_data);

     	}

    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
}