/* Template: ABC Learning Centre (WDD Module - ASSIGNMENT)
   Author: Lim Yao Cheng
   Created: 2020
   Description: Custom JS - Single Page Application & Form Validation

Table Of Contents:

01. Variable Initialization
02. Once Document is Ready to Performed $(document).ready(function(){})
03. Check URL () and load the SPA (home, about, contact...)
04. loadPage () - Load Page like 'home', 'about', 'contact', 'privacy-policy', 'register'
05. loadCourse () - Load Page like 'course-html-css-page01' ... all course details and course schedules page
06. loadMessage () - Load Page like 'thank-you.php' and
retrieve data from database and display together with thank you message.
07. loadjscssfile () - JAVASCRIPT & CSS FILE to Header 
08 - Form Validation - Validate when an event fire or onSubmit
*/



// Initialize
var default_content="";
var home_title = "ABC Learning Centre";
var lastCourse="";
var lastUrl = "";

/*
Once Document is Ready to Performed, take the following actions
*/
$(document).ready(function(){

	checkURL();

	$('nav ul li a').click(function (e){
		hash = window.location.hash;
		checkURL(hash);
	});

	//filling in the default content
	default_content = $('#pageContent').html();

	setInterval("checkURL()");


});

/*
Check URL () and load the SPA (home, about, contact...)
*/
function checkURL(hash)
{
	if(!hash) hash=window.location.hash;
	url  = hash.slice(0,7); // Slice out to extract '#course'

	if(hash != lastUrl || url != lastCourse)
	{
		lastUrl=hash;
		lastCourse=url;
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		if(hash==""){
			document.title = home_title;
			$('#pageContent').html(default_content);
		}
		
		else{
			if(hash=="#courses-offered")
			{
				loadPage(hash); // Only LOAD courses-offered.html
			}
			else if (hash=="#thank-you"){
				loadMessage(hash); // EX: LOAD thank-you.php

			}
			else if (url=="#course"){
				loadCourses(hash); // EX: LOAD course-html-css-pg01.html and other courses
			}
			
			else {
				loadPage(hash); //EX: LOAD about.html and other pages
			}
		}
	}
}

/* 
Load Page like 'home', 'about', 'contact', 'privacy-policy', 'register'
*/
function loadPage(url)
{
	url=url.replace('#','');
	search = window.location.search;
	title = url.replace(/-/g, ' ');

	$.ajax({
		type: "POST",
		url: "load-page.php",
		data: 'page='+url,
		dataType: "html",
		success: function(msg){

			if(parseInt(msg)!=0)
			{
				loadjscssfile("assets/css/menu.min.css", "css") ////dynamically load and add this .css file
				document.title = (title + ' | ' + home_title).toUpperCase();
				$('#pageContent').html(msg);
				if (window.location.search.includes(search)){
					validation();
				}
			}
		}

	});

}


/* 
Load Page like 'course-html-css-page01' ... all course details and course schedules page
*/
function loadCourses(url)
{
	url=url.replace('#course-','');
	title = url.replace(/-/g, ' ');
	$.ajax({
		type: "POST",
		url: "load-course.php",
		data: 'course='+url,
		dataType: "html",
		success: function(msg){
			loadjscssfile("assets/css/menu.min.css", "css"); ////dynamically load and add this .css file
			loadjscssfile("assets/js/vendor/jquery-ui.min.js", "js"); ////dynamically load and add this .js file
			loadjscssfile("assets/css/vendor/jquery-ui.min.css", "css"); ////dynamically load and add this .css file
			loadjscssfile("assets/js/tabmenu.js", "js"); ////dynamically load and add this .js file

			if(parseInt(msg)!=0)
			{
				document.title = (title + ' | ' + home_title).toUpperCase();
				$('#pageContent').html(msg);
				$('#loading').css('visibility','hidden');
			}
		}
	});
}

/* 
Load Page like 'thank-you.php' and
retrieve data from database and display together with thank you message.
*/
function loadMessage(url)
{
	url=url.replace('#','');
	title = url.replace(/-/g, ' ');
	$('#loading').css('visibility','visible');
	search = window.location.search;

	$.ajax({
		url: "load-message.php",
		method: "GET",
		data: 'page='+url,
		success: function(msg){
			$.ajax({
				url: "thank-you.php",
				method: "GET",
				dataType: "JSON",
				success: function(msg){
					if(parseInt(msg)!=0)
					{
						loadjscssfile("assets/css/menu.min.css", "css") ////dynamically load and add this .css file
						document.title = (title + ' | ' + home_title).toUpperCase();
						$('#pageContent').html("<h1>Form Submitted Successfully</h1>\
						<p> Dear <strong>" +
						msg.fname + "  " + msg.lname  + "</strong>,</p>\
						<p>Thank You for your registration!!!\
						<br>\
						Course detail have been sent to your email address (<strong>" +
						" " + msg.email + " ) <strong></p>");
						$('#loading').css('visibility','hidden');
					}
				}

			}); // End of inner AJAX

		}

	}); // End of outer AJAX

}


/* 
LOAD JAVASCRIPT & CSS FILE to Header 
*/
function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


/*
Form VALIDATION 

Table Of Contents:

01. Check Blank
02. Print Blank Error Message
03  Check for Alpha Character
04  Print Alpha Error Message
05  Check for Numeric Character
06  Print Numeric Error Message
07  Check for email validity 
08  Print Email Error Message 
09  Check for Phone Length
10  Print Phone Length Error Message 
11  Check for Password Length 
12. Print Password Length Error Messsage
13. Print Random Message
14. Validation [Validate when an event fire || onSubmit ] 
*/


// 1. C H E C K  I F  F I E L D  I S  B L A N K
function checkBlank (eID)
{
	var value = document.getElementById(eID).value;
	if (value == "")
	{
	return true;
	}
	else
	{
	return false;
	}
}

// 2. Print Blank Error Msg
function blankErrorMsg (eID, errID)
{
    if(checkBlank(eID))
	randomeErrorMsg(errID,'Please fill in this fill');
    else
	randomeErrorMsg(errID,'');
}

// 3. C H E C K  I F  F I E L D  H A S  A L P H A B E T  F O R  E V E N T
// IF is not equal to [ (A-Z) || (Num-Lock Keys) || (No key entered) || (backspace/delete) || (spacebar)]
function checkalpha (event)
{
if(!( (event.which >= 65 && event.which <= 90) || (event.which >= 97 && event.which <= 122) ||
(event.which == 0) || (event.which == 8) || (event.which == 32)))
{
	event.preventDefault();
    return false;
}
else
	return true;
}

// 4. Print Alpha Error message
function alphaErrorMsg (errID){
	randomeErrorMsg(errID,"Invalid Name Format. Please enter only alphabet.");
}


// 5. C H E C K  I F  F I E L D  H A S  N U M B E R  F O R  E V E N T
// IF is not equal to (0-9)
function checkNum (event)
{
if(!( (event.which >= 48 && event.which <= 57) || (event.which == 8) ))
	{
		event.preventDefault();
		return false;
	}
	else
		return true;
}

// 6. Print Numeric Error Message
function numErrorMsg(errID)
{
	randomeErrorMsg(errID,"Invalid Number Format. Please enter only number.");
}


/*
7. EMAIL VALIDATION
*/
// Validate email based on pattern : Must be in the form of 'xxx@xxx.xxx or xxx@xxx.xx'
function checkEmail (eID)
{
    var value = document.getElementById(eID).value;
        
    if ((/^\w+([\.-]?\w+)+@\w+\.\w{2,3}(\.\w{2})?$/g).test(value))
    return true
    else
        return false;
}

// 8. Print Email Error Message Must be in the form of 'xxx@xxx.xxx or xxx@xxx.xx'
function emailPrintMsg (errID)
{    
	randomeErrorMsg(errID,"Email must be valid form. xxx@xxxxx.xxx or xxx@xxxxx.xxx.xx");
}


// 9. C  H  E  C  K  T H E  L E N G T H  O F  P H O N E  N U M B E R 
function checkPhoneLength(eID){
    var value = document.getElementById(eID).value;

    if ((/^\d{10,11}$/g).test(value))
        return true;
    else
        return false;
}

// 10. Print Error Message for Phone Length
function phoneLengthErrorMsg(errID){
	randomeErrorMsg(errID,"Please enter minimum 10 digits maximum 11 digits.");
}


// 11. C  H  E  C  K  T H E  L E N G T H  O F  P A S S W O R D
function checkPasswordLength(eID){
    var value = document.getElementById(eID).value;
    // at least 1 number, 1 lowercase and 1 uppercase letter
    // Must be 12 characters.
    if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12}$/g).test(value))
        return true;
    else
        return false;
}

// 12. Print Error Message for Phone Length
function passwordLengthErrorMsg(errID){
	//document.getElementById(errID).innerHTML = "Please enter 12 characters.";
	randomeErrorMsg(errID,"Please enter 12 characters. At least 1 number, 1 lowercase and 1 uppercase letter");

}

// 13. Print Random Message
function randomeErrorMsg(errID,msg){
	document.getElementById(errID).innerHTML = msg;
}

/*
14. Validation [Validate when an event fire || onSubmit ] 
*/
function validation(){
	var name = 'name';
	var fname= 'fname';
	var lname= 'lname';
	var phone= 'phone';
	var email= 'email';
	var password= 'password';
	var fcourse= 'fcourse';

	var errorName = 'error-name';
	var errorFName = 'error-fname';
	var errorLName= 'error-lname';
	var errorPhone= 'error-phone';
	var errorEmail= 'error-email';
	var errorPassword= 'error-password';
	var errorFcourse='error-course';
	

	var dataString = "";

	/*
	ACTION TAKEN ONCE A CERTAIN EVENT TRIGGER 
	*/

	$( '#password' ).keydown(function() {
		if (!checkPasswordLength(password)){
			passwordLengthErrorMsg(errorPassword);
		}else{
			randomeErrorMsg(errorPassword,"");
		}
	});

	$( '#password' ).keyup(function() {
		if (!checkPasswordLength(password)){
			passwordLengthErrorMsg(errorPassword);
		}else{
			randomeErrorMsg(errorPassword,"");
		}
	});

	$( '#phone' ).keydown(function(e) {
		if (checkNum(e)){
			if (!checkPhoneLength(phone)){
				phoneLengthErrorMsg(errorPhone);
			}else{
				randomeErrorMsg(errorPhone,"");
			}
		}else{
			numErrorMsg(errorPhone);
		}
	});

	$( '#phone' ).keyup(function(e) {
		if (checkNum(e)){
			if (!checkPhoneLength(phone)){
				phoneLengthErrorMsg(errorPhone);
			}else{
				randomeErrorMsg(errorPhone,"");
			}
		}else{
			numErrorMsg(errorPhone);
		}
	});


	$( '#email' ).keydown(function() {
		if (!checkEmail(email)){
			emailPrintMsg(errorEmail);
		}else{
			randomeErrorMsg(errorEmail,"");
		}
	});

	$( '#email' ).keyup(function() {
		if (!checkEmail(email)){
			emailPrintMsg(errorEmail);
		}else{
			randomeErrorMsg(errorEmail,"");
		}
	});

	$( '#fname' ).keydown(function(e) {
		if (!checkalpha(e)){
			alphaErrorMsg(errorFName);
		}else{
			randomeErrorMsg(errorFName,"");
		}
	});

	$( '#lname' ).keydown(function(e) {
		if (!checkalpha(e)){
			alphaErrorMsg(errorLName);
		}else{
			randomeErrorMsg(errorLName,"");
		}
	});

	$( '#name' ).keydown(function(e) {
		if (!checkalpha(e)){
			alphaErrorMsg(errorName);
		}else{
			randomeErrorMsg(errorName,"");
		}
	});


	/*
	HAPPEN ONCE USER CLICK SUBMIT BUTTON 
	*/
    $("#submit").click(function(){


        if(checkBlank(fname) || checkBlank(lname) || checkBlank(phone) || checkBlank(email) || checkBlank(password) || checkBlank(fcourse))
        {
            blankErrorMsg(fname,errorFName);
            blankErrorMsg(lname,errorLName);
            blankErrorMsg(phone,errorPhone);
            blankErrorMsg(email,errorEmail);
            blankErrorMsg(password,errorPassword);
            blankErrorMsg(fcourse,errorFcourse);

            if(!checkEmail(email)){
                emailPrintMsg(errorEmail);
            }

            if (!checkPhoneLength(phone)){
                phoneLengthErrorMsg(errorPhone);
            }

            if (!checkPasswordLength(password)){
                passwordLengthErrorMsg(errorPassword);
            }
		}
		
		// Perform the following when the above VALIDATIONS are PASSED.
        else
        {
			var fnameVal= $("#fname").val();
			var lnameVal= $("#lname").val();
			var phoneVal= $("#phone").val();
			var emailVal=$("#email").val();
			var passwordVal=$("#password").val();
			var fcourseVal=$("#fcourse").val();
			dataString = 'fname=' + fnameVal + '&lname=' + lnameVal + '&phone=' + phoneVal + '&email=' + emailVal + '&password=' + passwordVal + '&fcourse=' + fcourseVal;
            $.ajax({
            type:"POST",
            url:"register-process.php",
            data:dataString,
            cache:false
        });
        window.location.replace('#thank-you'); //Display thank-you.php content
    }
    return false;
});
};