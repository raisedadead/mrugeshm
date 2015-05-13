
/*
 * Contacts Model
 */
var contactModel = Backbone.Model.extend({
		defaults: {
			name  : '',
			email : '',
            phone : '',
            messg : ''
		}
	});

/*
 * Contacts Collection
 */
var contactCollection = Backbone.Firebase.Collection.extend({
    model: contactModel,
    url: 'https://mrugeshm.firebaseio.com/contacts',
    autoSync: false
});

// Form View
var FormView = Backbone.View.extend({
  
    el: $('#contactForm'),
  
    events: {
    "click #sendBtn" : "createContact",
    },
    
    initialize: function() {
        this.name   = this.$("#name");
        this.email  = this.$("#email");
        this.phone  = this.$("#phone");
        this.messg  = this.$("#messg");
    },
    
    createContact: function(e) {
        
        if ( !this.name.val() || !this.email.val() || !this.phone.val() || !this.messg.val() ) { 
            return; 
        }
        
        var result = this.collection.create({
            name  : this.name.val(),
			email : this.email.val(),
            phone : this.phone.val(),
            messg : this.messg.val()
        });
     
        if(result){
            this.success();
        }else{
            this.error();
        }
        
        this.name.val('');
        this.email.val('');
        this.phone.val('');
        this.messg.val('');
    },
    
    success: function() {
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
        
    },
    error: function() {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-danger').append("<strong>Sorry " + this.name.val() + ", it seems that my mail server is not responding. Please try again later!");
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
    },
});

// Start
var initMailApp = function() {
  var collection = new contactCollection();
  var app = new FormView({ collection: collection });
}

$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            
            if(initMailApp !== undefined) initMailApp();
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


