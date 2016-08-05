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



