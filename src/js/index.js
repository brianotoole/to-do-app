require("../scss/style.scss");

// Create Item
$('.submit-item').on('click', function (event) {
    event.preventDefault(); // Stop form from causing a page refresh.
    var data = {};
		data.name = $("#submit-form").find("input").val();
    var id;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType:'application/json',
      url: '/create',
      success: function(data) {
        var itemName = data.name;
        var itemHtml = '<li class="item" data-id="'+itemName+'"><a href="/delete/'+itemName+'">X</a><span>'+itemName +'</span>';
        $('ul.items').append(itemHtml);
        $("#submit-form").find("input").val('');
        //console.log(JSON.stringify(data));
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
    url: '/delete/'+id,
    complete: function(response) {
      //$(this).remove();
    }
  });
});
