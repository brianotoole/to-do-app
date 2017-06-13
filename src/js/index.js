require("../scss/style.scss");

// Create Item
$('.submit-item').on('click', function (event) {
    event.preventDefault(); // Stop form from causing a page refresh.
    var data = {};
		data.name = $("#submit-form").find("input").val();
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType:'application/json',
        url: '/create',
        success: function(data) {
            //console.log(data);
            var name = data.name;
            var id = data.id;
            var itemHtml = '<li class="item" data-id="'+id+'"><a href="/delete/'+id+'">X</a><span>'+name+'</span>';
            $('ul.items').append(itemHtml);
            $("#submit-form").find("input").val('');
        }
    });
});

// Delete Item
$('li.item').on('click', function (event) {
  event.preventDefault();
  var id = $(this).attr('data-id');
  $(this).remove();
  $.ajax({
      type: 'GET',
      data: id,
      contentType:'application/json',
      url: '/delete/'+id
  });
});

// Login form validation
$('#login-form').submit(function(e) {
    e.preventDefault();
    var email = $('input#email').val();
    var password = $('input#password').val();

    if(email == "" && password == ""){
      $('.error.email').text("Please enter an email address.");
       $('.error.pass').text("Please enter a password.");
       $('#email').focus();
       setTimeout(function(){
             $('.error.pass').text("");
             $('.error.email').text("");
           }, 2000);
       return false;
    }

    if(email == ""){
       $('.error.email').text("Please enter an email address.");
       $('#email').focus();
       setTimeout(function(){
             $('.error.email').text("");
           }, 2000);
       return false;
    }

    if(password == ""){
       $('.error.pass').text("Please enter a password.");
       $('#password').focus();
       setTimeout(function(){
             $('.error.pass').text("");
           }, 2000);
       return false;
    }

    if(username != '' && password != '') {
        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                console.log(data);
                // It looks like the page that handles the form returns JSON
                // Parse the JSON
                var obj = JSON.parse(data);

                if(obj.result != 'invalid') {
                    console.log('hi');
                }
            }
        });
    }
});
