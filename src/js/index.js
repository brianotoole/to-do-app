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
