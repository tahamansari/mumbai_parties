var base_url = "http://casaestilo.in/taha/mp_admin/index.php/Api/";
var img_url = "http://mumbaiparties.com/assets/uploads/";

var casa_img_url = "http://casaestilo.in/taha/mp_admin/assets/";

$(window).load(function () {
	 
	 // 
	 // initMap();
// 	 alert("window loeeded");

})

$(document).ready(function(){	
 



});

function isEmail(email) {

	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);

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


		}


	})

});


function get_location(){


    console.log('ajax location called');


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
        }

    })
}


// var myLatLng = {lat: 18.977732, lng: 72.827325};

// var map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 14,
//   center: myLatLng
// });

// var marker = new google.maps.Marker({
//   position: myLatLng,
//   map: map,
//   title: 'Hello World!'
// });


function get_initial_map_data(loc_id){

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


	$.ajax({

		type:"POST",
		url:base_url+"get_initial_map_data/",
		dataType:'json',
		data:{

			"loc_id":loc_id
		},
		success:function(result){

			var locations = "[";

			$.each(result, function(i){

				locations += "['"+result[i]['name']+"', "+result[i]['latitude']+", "+result[i]['longitude']+"],";

			});

	        locations += "]";

			// result[0]['zoom']
		    var map = new google.maps.Map(document.getElementById('map'), {
		      zoom: 14,
		      center: new google.maps.LatLng(result[0]['center_latitute'], result[0]['center_longitute']),
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    });

		    map.setOptions({styles: styles});

		    var infowindow = new google.maps.InfoWindow();

		    var marker, i;

		    $.each(result, function(i){

				// locations += "['"+result[i]['name']+"', "+result[i]['latitude']+", "+result[i]['longitude']+"],";

					marker = new google.maps.Marker({
			        position: new google.maps.LatLng(result[i]['latitude'], result[i]['longitude']),
			        map: map,
			        icon: casa_img_url+result[i]['marker']

			      });

			      google.maps.event.addListener(marker, 'click', (function(marker, i) {
			        return function() {
			          infowindow.setContent(result[i]['entity_name']);
			          infowindow.open(map, marker);
			        }
			      })(marker, i));

			});

		}

	})


}




$(document).on('change','#select_location',function(){


	mainView.router.loadPage('mapview.html');


});



$(document).on('click','.get_map_data',function(event){

	 event.preventDefault();
	 // call get event

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


	 var id = $(this).attr('id');

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_map_data/",
	 	dataType:"json",
	 	data:{

	 		"id":id
	 	},
	 	success:function(result){


	 		var locations = "[";

			$.each(result, function(i){

				locations += "['"+result[i]['name']+"', "+result[i]['latitude']+", "+result[i]['longitude']+"],";

			});

	        locations += "]";

			
		    var map = new google.maps.Map(document.getElementById('map'), {
		      zoom: 14,
		      center: new google.maps.LatLng(19.136364, 72.827997),
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    });

		    map.setOptions({styles: styles});

		    var infowindow = new google.maps.InfoWindow();

		    var marker, i;

		    $.each(result, function(i){

				// locations += "['"+result[i]['name']+"', "+result[i]['latitude']+", "+result[i]['longitude']+"],";

					marker = new google.maps.Marker({
			        position: new google.maps.LatLng(result[i]['latitude'], result[i]['longitude']),
			        map: map,
			        icon: casa_img_url+result[i]['marker']

			      });

			      google.maps.event.addListener(marker, 'click', (function(marker, i) {
			        return function() {
			          infowindow.setContent(result[i]['name']);
			          infowindow.open(map, marker);
			        }
			      })(marker, i));

			});


	 	}
	})
})




$(document).on("click","#signout",function(event){

	event.preventDefault();

	$("#signin-div").html("<a href='login.html' class='close-panel'> <h2 class='username'>Sign in</h2> </a>");
    $("#signout-div").css("display","none");

    Lockr.rm('is_logged_in');
    Lockr.rm('name');
	Lockr.flush();

	myApp.alert("Logged out");
	mainView.router.loadPage("index.html");


})



function get_event_type(){


		$.ajax({

		type:"POST",
		url:base_url+"get_event_type/",
		crossDomain:true,
		success:function(result){

			// console.log(result);
			var json = JSON.parse(result);

			var list = "";
			$.each(json,function (i) {
				 
				list += "<div class='col-50 list-box'>"+
				// "+img_url+json[i]['img_name']+"
						"<a id='"+json[i]['id']+"' class='get_list_event'><img src='img/event.jpeg' width='100%' alt='img error'>"+
						"<div class='list-overlay'>"+json[i]['type']+"</div></a>"+
						"</div>";
			})

			$("#event_box").html(list);
			
		}


	})
}

$(document).on('click','.get_list_event',function(event){

	 event.preventDefault();
	 // call get event
	 var id = $(this).attr('id');

	 $.ajax({

	 	type:"POST",
	 	url: base_url+"get_list_data/",
	 	dataType:"json",
	 	data:{

	 		"id":id
	 	},
	 	success:function(result){

	 		console.log('res rec');

	 		var html = "";
	 		$.each(result,function(i) {


	 				// console.log(result[i]['name']);
	 			html +="<div class='card demo-card-header-pic' style='margin: 0;margin-bottom: 10px;width:100%'>"+
		                  "<div style='background-image:url(img/card.jpg)' valign='bottom' class='card-header no-border'>"+
		                  "<h3 class='no-mar list-name'>"+result[i]['name']+"</h3>" +
		                  "</div>"+
		                 
		                  "<div class='card-footer color-white'>"+
		                    "<span class='footer-text'>@woodside - All Day Bar & Eatery </span>"+
		                    "<span class='footer-text'>"+result[i]['start']+" to "+result[i]['end']+"</span>"+
		                  "</div>"+
		                "</div>";
	 			
	 			
	 		});

	 		$('#event_box').html(html);
	 	}
	})
})


