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

function onSuccess(result){
  console.log("Success:"+result);
}

function onError(result) {
  console.log("Error:"+result);
}

function call(){


	// alert('clicked');

	window.plugins.CallNumber.callNumber(onSuccess, onError, "8976321674", bypassAppChooser);

}



