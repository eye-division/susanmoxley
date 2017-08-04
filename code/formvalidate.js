<!-- hide from old browsers
// A utility function that returns true if a string contains only 
// whitespace characters.
function isblank(s) {
    for(var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if ((c != ' ') && (c != '\n') && (c != '\t')) return false;
    }
    return true;
}

// This is the function that performs form verification. It is invoked
// from the onsubmit event handler. The handler should return whatever
// value this function returns.
function verify(f) {
    var msg;
    var empty_fields = "";
    var errors = "";
	
    // Loop through the elements of the form, looking for all 
    // text and textarea elements that don't have an "optional" property
    // defined. Then, check for fields that are empty and make a list of them.
    // Also, if any of these elements have a "min" or a "max" property defined,
    // verify that they are numbers and in the right range.
    // If the element has a "numeric" property defined, verify that
    // it is a number, but don't check its range.
    // Put together error messages for fields that are wrong.
	
	// june 9 2004, AW added password as required type
	// how do I add radio buttons ?
	
    for(var i = 0; i < f.length; i++) {
        var e = f.elements[i];
        if (((e.type == "text") || (e.type == "password") || (e.type == "textarea") || (e.type == "radio")  || (e.type == "select-one")) && !e.optional) 
		{
            // first check if the field is empty
            if ((e.value == null) || (e.value == "") || isblank(e.value)) {
                empty_fields += "\n          " + e.name;
                continue;
            }
			
			// check for radio buttons?
			
			// check for select lists
			/*
			if(e.type == "select-one") {
				if(e.selectedIndex == "0") {
					errors += "- The field "+ e.name + " must be selected";	
				}
			}
			*/
            // Now check for fields that are supposed to be numeric.
            if (e.numeric || (e.min != null) || (e.max != null)) { 
                var v = parseFloat(e.value);
                if (isNaN(v) || 
                    ((e.min != null) && (v < e.min)) || 
                    ((e.max != null) && (v > e.max))) {
                    errors += "- The field " + e.name + " must be a number";
                    if (e.min != null) 
                        errors += " that is greater than " + e.min;
                    if (e.max != null && e.min != null) 
                        errors += " and less than " + e.max;
                    else if (e.max != null)
                        errors += " that is less than " + e.max;
                    errors += ".\n";
                }
            } // end numeric check
			

			// check for emails field
			if (e.email && !isblank(e.value))
			{
				var seenAt = false;
				var append = "";
				for(var j = 0; j < e.value.length; j++)
				{
					var c = e.value.charAt(j);
					if ((c == ' ') || (c == '\n') || (c == '\t'))
					append += "\n           - not contain white space";
					if ((c =='@') && (seenAt == true))
					append += "\n           - contain only one @";
					if ((c =='@'))
					seenAt = true;
				}
				if (seenAt == false)
				append += "\n              - contain exactly one @";
				if (append)
					errors += "- The field " + e.name + " must: " + append;
					
				
			} // end email check
			// matching
			if (e.matches) {	// n ew code - hard coded to 'username' and 'username2' at the moment,
			// be nice to make this dynamic to match ANY two fields in form
				
				var p1 = e.name;
				var p2 = p1+"2";
				//alert("we're looking for a matching fields - "+ p1 + ": " + f.username.value + ", " + p2 + ": "+f.username2.value);
				if(f.username.value != f.username2.value) {
					errors += "\n Email addresses must be the same";
				}
			}
			
			// link checker here - ie must be of form http://
			if (e.link && !isblank(e.value))
			{
				var seenAt = false;
				var append = "";

				for(var j = 0; j < e.value.length; j++)
				{
					var c = e.value.charAt(j);
					if ((c == ' ') || (c == '\n') || (c == '\t')) // must have no spaces
					append += "\n           - not contain white space";
				}
				// must have http:// in it
				if (append)
					errors += "- The field " + e.name + " must: " + append;
			} // end if link
			
			// 
        }
    }

	// check for radio buttons?
 var el = document.forms[0].elements;
 for(var i = 0 ; i < el.length ; ++i) {
	  if(el[i].type == "radio") {
		   var radiogroup = el[el[i].name]; // get the whole set of radio buttons.
		   var itemchecked = false;
		   for(var j = 0 ; j < radiogroup.length ; ++j) 
		   {
				if(radiogroup[j].checked) 
				{
					 itemchecked = true;
					 break;
				}
		   }
		   if(!itemchecked) { 
			   errors += "\n'" + el[i].name + "' must be selected\n";
				//alert("Please choose an answer for "+el[i].name+".");
				if(el[i].focus) {
					el[i].focus();
				}
				//return false;
			}  
		}
 }
 
    // Now, if there were any errors, display the messages, and
    // return false to prevent the form from being submitted. 
    // Otherwise return true.
    if (!empty_fields && !errors) return true;

    msg  = "______________________________________________________\n\n"
    msg += "The form was not submitted because of the following error(s).\n";
    msg += "Please correct these error(s) and re-submit.\n";
    msg += "______________________________________________________\n\n"

    if (empty_fields) {
        msg += "- The following required field(s) are empty:" 
                + empty_fields + "\n";
        if (errors) msg += "\n";
    }
    msg += errors;
    alert(msg);
    return false;
}

function verifySelect(f) {
	var errors = "";
	for(var i = 0; i < f.length; i++) {
        var e = f.elements[i];
		//errors += "Element " + e.type + " selected: "+e.selectedIndex;
        if(e.type == "select-one") 
		{
			//errors += e.name + " is a select list";
			if(e.selectedIndex == "0") {
				errors += " no option selected\n";	
			}
		} else {
			errors += "No select list found in " + e.name + "\n";
		}
	}

    alert(errors);
	return false;
}
// sample radio button required script
function submitIt(form) {
	option = -1
	for (i=0; i<form.position.length; i++) {
		if (form.position[i].checked) {
			option = i
		}
	}
	if (option == -1) {
		alert("You must choose an option")
		return false
	}
	return true
}


function textCounter(field, countfield, maxlimit) 
{
if (field.value.length > (maxlimit + 200)) // if too long...trim it!
field.value = field.value.substring(0, (maxlimit + 200));
// otherwise, update 'characters left' counter
else 
countfield.value = maxlimit - field.value.length;
}

function validatePwd(myForm) {
var invalid = " "; // Invalid character is a space
var minLength = 6; // Minimum length
var pw1 = document.myForm.new_passwd.value;
var pw2 = document.myForm.new_passwd2.value;
// check for a value in both fields.
if (pw1 == '' || pw2 == '') {
alert('Please enter your password twice.');
return false;
}
// check for minimum length
if (document.myForm.new_passwd.value.length < minLength) {
alert('Your password must be at least ' + minLength + ' characters long. Try again.');
return false;
}
// check for spaces
if (document.myForm.new_passwd.value.indexOf(invalid) > -1) {
alert("Sorry, spaces are not allowed.");
return false;
}
else {
if (pw1 != pw2) {
alert ("You did not enter the same new password twice. Please re-enter your password.");
return false;
}
else {
alert('Nice job.');
return true;
      }
   }
}



function CountWords (this_field, count, countRemainder, show_word_count, show_char_count, maxlimit) {
if (show_word_count == null) {
show_word_count = true;
}
if (show_char_count == null) {
show_char_count = false;
}
var char_count = this_field.value.length;
var fullStr = this_field.value + " ";
var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi;
var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
var non_alphanumerics_rExp = rExp = /[^A-Za-z0-9]+/gi;
var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
var splitString = cleanedStr.split(" ");
var word_count = splitString.length -1;
var words_remaining = (maxlimit - word_count);
if (fullStr.length <2) {
word_count = 0;
}
if (word_count == 1) {
wordOrWords = " word";
}
else {
wordOrWords = " words";
}
if (char_count == 1) {
charOrChars = " character";
} else {
charOrChars = " characters";
}
if (show_word_count & show_char_count) {
	if (word_count > maxlimit)
	{
		alert ("You've reached the word limit");
		// trim string too
		//var maxvalue = this_field.value;
		//this_field.value = this_field.value.substring(0,(maxvalue));
	} 
	count.value = word_count;
	countRemainder.value = words_remaining;
//alert ("Word Count:\n" + "    " + word_count + wordOrWords + "\n" + "    " + char_count + charOrChars);
}
else {
if (show_word_count) {
	if (word_count >= maxlimit)
	{
		alert ("Too many words!");
	}
	count.value = word_count;
	countRemainder.value = words_remaining;
//alert ("Word Count:  " + word_count + wordOrWords);
}
else {
if (show_char_count) {
	count.value = word_count;
//alert ("Character Count:  " + char_count + charOrChars);
      }
   }
}
return word_count;
}

