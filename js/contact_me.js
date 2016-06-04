---
---
$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events {{ site.email }}
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var lang = $("input#lang").val();

            var subject, submit_ok, submit_fail;

            if (lang == 'en'){
                subject = "{{ site.t.en.contact.subject }}";
                submit_ok = "{{ site.t.en.contact.submit_ok }}";
                submit_fail = "{{ site.t.en.contact.submit_fail }}";
            }
            else {
                subject = "{{ site.t.es.contact.subject }}";
                submit_ok = "{{ site.t.es.contact.submit_ok }}";
                submit_fail = "{{ site.t.es.contact.submit_fail }}";
            }

            $.ajax({
                url: "//formspree.io/{{ site.email }}",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    _subject: subject,
                    _gotcha: ""
                },
                dataType : 'json',
                encode : true,
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>" + submit_ok + "</strong>");
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
                    $('#success > .alert-danger').append("<strong>" + submit_fail + "</strong>");
                    $('#success > .alert-danger').append('</div>');
                },
            })
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
