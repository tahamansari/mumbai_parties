var base_url = "http://casaestilo.in/taha/mp_admin/index.php/Api/";
var img_url = "http://mumbaiparties.com/assets/uploads/";

var casa_img_url = "http://casaestilo.in/taha/mp_admin/assets/";

$(window).load(function () {
	 
//   initMap();
// 	 alert("window loeeded");

});

$(document).ready(function(){	
 



});

function isEmail(email) {

	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);

}

function format_time(time) {
	
	var time = time;
	time = time.slice(0, -3);
	return time;

}



$(document).on('click','#register_button',function(event){

	event.preventDefault();

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

	$.ajax({

		url: base_url+"register/",
		type:'POST',
		dataType:'json',
		data:{

			name: name,
			email: email,
			password: password,
			confirm_password: confirm_password,
			age: age,
			gender:gender,
			mobile: mobile

		},
		success:function(result){

			if(result.status=='success'){

				Lockr.set("name",name);
				Lockr.set("is_logged_in",true);

				myApp.alert("Success");				
				mainView.router.loadPage("location.html");

			}

		},
		error: function(jqXHR, exception) {

			alert("error");
		}


	})

});

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

			// console.log(result);
			// console.log(result.status);

			if(result.status=='success'){

				
				Lockr.set("name",result.name);
				Lockr.set("is_logged_in",true);

				myApp.alert("Success");				
				mainView.router.loadPage("location.html");

			}else{

				myApp.alert("Invalid Login");
			}


		},
		error: function(jqXHR, exception) {
			
			alert("error");
		}


	})

});

$(document).on("click","#signout",function(event){

	event.preventDefault();

	$("#signin-div").html("<a href='login.html' class='close-panel'> <h2 class='username'>Sign in</h2> </a>");
    $("#signout-div").css("display","none");

    Lockr.rm('is_logged_in');
    Lockr.rm('name');
	Lockr.flush();

	logout();

	myApp.alert("Logged out");
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
		          $('#select_location').html(select);

 			}else{

 				if(result['msg']=="no data"){
 					alert("no data");
 				}else{
 					alert("failed");
 				}

 			}

        },
		error: function(jqXHR, exception) {
			
			alert("error");
		}

    })
}

$(document).on('change','#select_location',function(){

	var id = $("#select_location").val();
	mainView.router.loadPage('mapview.html?id='+id);


});

function initial_marker_clicked_event(id){
	// 30
	mainView.router.loadPage('entitie.html?id='+id);
}


function get_initial_map_data(id){

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
                }
            ];


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

		    var map = new google.maps.Map(document.getElementById('map'), {
		      zoom: 14,
		      center: new google.maps.LatLng(result['center'][0]['latitute'], result['center'][0]['longitute']),
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    });

			map.setOptions({styles: styles});

		    var marker,i;

	        $.each(result['data'],function(key, value) {

		      marker = new google.maps.Marker({
		        position: new google.maps.LatLng(value.latitude,value.longitude),
		        map: map
		      });

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
			alert("error");
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

			console.log(result);

			if(result['status']=="success"){

				var entitie_heading = "<h3 class='no-mar' style='color: yellow;padding: 10px;'>"+
							result['entitie'][0]['name']+
	                           "<br>"+
	                           "<i class='fa fa-star' aria-hidden='true'></i>"+
	                           "<i class='fa fa-star' aria-hidden='true'></i>"+
	                           "<i class='fa fa-star' aria-hidden='true'></i>"+
	                        "</h3>";

	            var entitie_address = "<p>"+result['entitie'][0]['address']+"</p>";

	            var entitie_timming = "<p style='font-size: 12px;float:left'>Open from "+format_time(result['entitie'][0]['open_hours'])+" to "+format_time(result['entitie'][0]['closing_hours'])+"</p>";
						               
					

				var menu_data = "";

				if(result['menu_images'] == "no data"){

					$("#menu_data_entitie").html("No Menu Available");

				}else{

					$.each(result['menu_images'],function(key,value){

						menu_data += "<img width='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no img'>";
					})

					$("#menu_data_entitie").html(menu_data);

				}

				var entitie_events = "";

				if(result['events'] == "no data"){

					$("#entitie_events").html("No Event Available");

				}else{

					$.each(result['events'],function(key,value){

						entitie_events += "<div data-id='"+value.event_id+"' class='card demo-card-header-pic get-event' style='margin: 0;margin-bottom: 10px;width:100%'>"+

                          "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
                          "<h3 class='no-mar list-name'>"+value.event_name+"</h3>"+
                          "</div>"+
                         
                          "<div class='card-footer color-white'>"+
                            "<span class='footer-text'>@woodside - All Day Bar & Eatery </span>"+
                            "<span class='footer-text'>10am to 12pm</span>"+
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

						entitie_offers += "<div data-id='"+value.offer_id+"' class='card demo-card-header-pic get-offer' style='margin: 0;margin-bottom: 10px;width:100%'>"+

                          "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
                          "<h3 class='no-mar list-name'>"+value.offer_name+"</h3>"+
                          "</div>"+
                         
                          "<div class='card-footer color-white'>"+
                            "<span class='footer-text'>@woodside - All Day Bar & Eatery </span>"+
                            "<span class='footer-text'>10am to 12pm</span>"+
                          "</div>"+
                        "</div>";


					})

					$("#entitie_offers").html(entitie_offers);

				}

				var entitie_call = "<br>...<i class='fa fa-phone' onclick='call("+result['entitie'][0]['bar_contact']+")' style='font-size: 30px;color: #03A9F4;' aria-hidden='true'></i>";

				var entitie_direction = "<i class='fa fa-globe'  onclick='get_direction("+result['entitie'][0]['latitude']+","+result['entitie'][0]['longitude']+")' aria-hidden='true'></i>";


		        $("#entitie_call").html(entitie_call);
		        $("#entitie_direction").html(entitie_direction);

	            $("#entitie_heading").html(entitie_heading);
	            $("#entitie_address").html(entitie_address);
	            $("#entitie_timming").html(entitie_timming);				

			}else{

				if(result['msg'] = "no data"){

					alert("no data");

				}else{

					alert("failed");
				}
			}

		},
		error: function(jqXHR, exception) {
			alert("error");
		}
	});
}

$(document).on('click','.get-offer',function(event){

	var id = $(this).attr('data-id');

	// alert('id is '+id);
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

						var week_days =result['offer'][0]['weekly_base'];

						var offer_heading = "<h3 class='no-mar' style='color: yellow;padding: 10px;'>"+
									result['offer'][0]['offer_name']+
				                       "<br>"+
				                       "<i class='fa fa-star' aria-hidden='true'></i>"+
				                       "<i class='fa fa-star' aria-hidden='true'></i>"+
				                       "<i class='fa fa-star' aria-hidden='true'></i>"+
				                    "</h3>";

				        var offer_entitie_address = "<h3 style='margin: 5px 0;'>"+result['offer'][0]['name']+"</h3>"+
				                          "<p>"+result['offer'][0]['address']+"</p>";


				        var offer_timming = "<p style='font-size: 12px;float:left'>Open from "+format_time(result['offer'][0]['start_time'])+" to "+format_time(result['offer'][0]['end_time'])+"</p>"+
								               
								  

									"<table style='float: right'>"+

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


				     	if (week_days.indexOf('Sunday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Monday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Tuesday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Wednesday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Thursday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Friday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				    	if (week_days.indexOf('Saturday') > -1) {

				 		
				    		offer_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		offer_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";
				    	}

						offer_timming += "</tr>";
						offer_timming += "</tbody>";



						offer_timming += "</table>";



						var menu_data = "";

						if(result['menu_images'] == "no data"){

							$("#menu_data_offer").html("No Menu Available");

						}else{

							$.each(result['menu_images'],function(key,value){

								menu_data += "<img width='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no imgg'>";

							})

							$("#menu_data_offer").html(menu_data);

						}

						var offer_call = "<br>...<i class='fa fa-phone' onclick='call("+result['offer'][0]['bar_contact']+")' style='font-size: 30px;color: #03A9F4;' aria-hidden='true'></i>";

						var offer_direction = "<i class='fa fa-globe'  onclick='get_direction("+result['offer'][0]['latitude']+","+result['offer'][0]['longitude']+")' aria-hidden='true'></i>";


				        $("#offer_call").html(offer_call);
				        $("#offer_direction").html(offer_direction);

				        $("#offer_heading").html(offer_heading);
				        $("#offer_entitie_address").html(offer_entitie_address);
				        $("#offer_timming").html(offer_timming);

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




						var week_days =result['event'][0]['weekly_base'];

						var event_heading = "<h3 class='no-mar' style='color: yellow;padding: 10px;'>"+
									result['event'][0]['event_name']+
				                       "<br>"+
				                       "<i class='fa fa-star' aria-hidden='true'></i>"+
				                       "<i class='fa fa-star' aria-hidden='true'></i>"+
				                       "<i class='fa fa-star' aria-hidden='true'></i>"+
				                    "</h3>";

				        var event_entitie_address = "<h3 style='margin: 5px 0;'>"+result['event'][0]['name']+"</h3>"+
				                          "<p>"+result['event'][0]['address']+"</p>";

				        // <i style='font-size: 20px;margin-top: 7px;' class='fa fa-clock-o' aria-hidden='true'></i>
				        var event_timming = "<p style='font-size: 12px;float:left'>Open from "+format_time(result['event'][0]['time_event_start'])+" to "+format_time(result['event'][0]['time_event_ends'])+"</p>"+
								               
								  

									"<table style='float: right'>"+

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


				     	if (week_days.indexOf('Sunday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Monday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Tuesday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Wednesday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Thursday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				     	if (week_days.indexOf('Friday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";

				    	}

				    	if (week_days.indexOf('Saturday') > -1) {

				 		
				    		event_timming += "<td><span><i class='fa fa-circle active-dot' aria-hidden='true'></i></td>";

				    	}else{

				    		event_timming += "<td><span><i class='fa fa-circle' aria-hidden='true'></i></td>";
				    	}

						event_timming += "</tr>";
						event_timming += "</tbody>";



						event_timming += "</table>";



						var menu_data = "";

						if(result['menu_images'] == "no data"){

							$("#menu_data_event").html("No Menu Available");

						}else{

							$.each(result['menu_images'],function(key,value){

								menu_data += "<img width='100%' src='http://mumbaiparties.com/assets/uploads/"+value.url+"' alt='no img'>";

							})

							$("#menu_data_event").html(menu_data);

						}

						var event_call = "<br>...<i class='fa fa-phone' onclick='call("+result['event'][0]['bar_contact']+")' style='font-size: 30px;color: #03A9F4;' aria-hidden='true'></i>";

						var event_direction = "<i class='fa fa-globe'  onclick='get_direction("+result['event'][0]['latitude']+","+result['event'][0]['longitude']+")' aria-hidden='true'></i>";


				        $("#event_call").html(event_call);
				        $("#event_direction").html(event_direction);
				        $("#event_heading").html(event_heading);
				        $("#event_entitie_address").html(event_entitie_address);
				        $("#event_timming").html(event_timming);

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
							"<a data-id='"+value.id+"' class='get-event-data'><img src='img/event.jpeg' width='100%' alt='img error'>"+
							"<div class='list-overlay'>"+value.event_type+"</div></a>"+
							"</div>";
				})

				$("#event_box").html(list);

			}else{

				if(result['msg'] = "no data"){

					alert("no data");

				}else{

					alert("failed");
				}
			}
			
		},
		error: function(jqXHR, exception) {
			
			alert("error");
		}


	})
}

$(document).on('click','.get-event-data',function(event){
		//2
	 var id = $(this).attr("data-id");
	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_event_data/",
	 	dataType:"json",
	 	data:{

	 		id:id
	 	},
	 	success:function(result){

	 		console.log(result);

	 		if(result['status']=="success"){

	 			var html = "";
		 		$.each(result['data'],function(key,value) {

		 			html +="<div data-id="+value.event_id+" class='card demo-card-header-pic get-event' style='margin: 0;margin-bottom: 10px;width:100%'>"+
			                  "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
			                  "<h3 class='no-mar list-name'>"+value.event_name+"</h3>" +
			                  "</div>"+
			                 
			                  "<div class='card-footer color-white'>"+
			                    "<span class='footer-text'>@woodside - All Day Bar & Eatery </span>"+
			                    "<span class='footer-text'>"+value.time_event_start+" to "+value.time_event_ends+"</span>"+
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


function marker_clicked_event(para1){

	mainView.router.loadPage("event.html?id="+para1);

}

$(document).on('click','.get_map_data',function(event){


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


	 var id = $(this).attr('data-id');

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_map_data/",
	 	dataType:"json",
	 	data:{

	 		id:id
	 	},
	 	success:function(result){

	 		console.log(result);

	 		if(result['status']=="success"){

	 			var map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 14,
			      center: new google.maps.LatLng(result['center'][0]['latitute'], result['center'][0]['longitute']),
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

				map.setOptions({styles: styles});

			    var marker,i;

		        $.each(result['data'],function(key, value) {

			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(value.latitude,value.longitude),
			        map: map
			      });

			      marker.addListener('click', function() {

			          marker_clicked_event(value.event_id);

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
			
			alert("error");
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
			
			alert("error");
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
          // console.log(json);

          $.each(json, function(i){

                // console.log(json[i]['id']);
                // console.log(json[i]['name']);
                select += "<option value='"+json[i]['id']+"'>"+json[i]['name']+"</option>";

          });

          $('#select_location').html(select);
          // console.log("printed value to dropdown");
        },
		error: function(jqXHR, exception) {
			
			alert("error");
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

	                list += "<li class='item-content' style='padding-left: 0;'>"+
				                "<div class='item-inner'>"+
				                  "<div class='item-title'>"+value.name+"</div>"+
				                "</div>"+
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
			
			alert("error");
		}

    })

}





















