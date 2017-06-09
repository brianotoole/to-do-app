require("../scss/style.scss");


$('.submit-item').on('click', function (event) {
    console.log('clicked');
    event.preventDefault(); // Stop form from causing a page refresh.
    var data = {};
		data.name = $("#submit-form").find("input").val();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType:'application/json',
      url: '/create',
      success: function(data) {
        console.log(JSON.stringify(data));
          var itemName = data.name;
          var newLiHtml = '<li class="item"' + itemName + '</span></li>';
          var newLiHtml = '<li class="item"><a href="/delete/"' + itemName + '>X</a><span>'+ itemName +'</span>';
          $('ul.items').append(newLiHtml);
          $('.item').val('');
      }
    });
});
