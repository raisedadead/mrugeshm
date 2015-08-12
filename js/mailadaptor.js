
// Contacts Model
var contactModel = Backbone.Model.extend({
    defaults: {
        name  : '',
        email : '',
        phone : '',
        messg : ''
    }
});


// Contacts Collection
var contactCollection = Backbone.Firebase.Collection.extend({
    model: contactModel,
    url: 'https://mrugeshm.firebaseio.com/contacts',
    autoSync: false
});

// Start 
var initMailApp = function( $form , data ) {
    
    if( !$form.collection )
  	 $form.collection = new contactCollection();
  
    var displaySuccess = function() {
        // Success message
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
        $('#success > .alert-success')
            .append('</div>');
    
        //clear all fields
        $('#contactForm').trigger("reset");      
    }

    var displayError = function() {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-danger').append("<strong>Sorry " + this.name.val() + ", it seems that my mail server is not responding. Please try again later!");
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
    }


    var result = $form.collection.create({
        name  : data.name,
    	email : data.email,
        phone : data.phone,
        messg : data.messg
    });
 
    if(result){
        displaySuccess();
    }else{
        displayError();
    }

    $form.submitStatus = true;
}

// On Ready
$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            
            event.preventDefault(); // prevent default submit behaviour
            
            // get values from FORM
            var data = {
            	name : $("input#name").val(),
            	email : $("input#email").val(),
            	phone : $("input#phone").val(),
            	message : $("textarea#messg").val(),
            	firstName : $("input#name").val(), // For Success/Failure Message
            }
            // Check for white space in name for Success/Fail message
            if (data.firstName.indexOf(' ') >= 0) {
                data.firstName = data.name.split(' ').slice(0, -1).join(' ');
            }
            
            // Check and initiate the contact addition
            if( $form.submitStatus === undefined || $form.submitStatus === false ) {
            	initMailApp( $form, data );
            }
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});


