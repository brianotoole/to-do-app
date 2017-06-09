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
        var itemName = data.name;
        var itemHtml = '<li class="item" data-name="' + itemName + '" ><a href="/delete/"' + itemName + '>X</a><span>'+ itemName +'</span>';
        $('ul.items').append(itemHtml);
        $("#submit-form").find("input").val(''); 
        //console.log(JSON.stringify(data));
      }
    });
});

// Delete Item
$('li.item').on('click', function (event) {
  event.preventDefault();
  var name = $(this).attr('data-name');
  $(this).remove();
  $.ajax({
    type: 'GET',
    data: name,
    contentType:'application/json',
    url: '/delete/'+name,
    complete: function(response) {
      //$(this).remove();
    }
  });
});
