number = 25;

function displaynumber(num) {
    var text = "<div class=\"col-lg-3 col-sm-6 g-mb-50\"><div class=\"js-counter g-font-size-35 g-font-weight-300 g-mb-7\">" + num + "</div><h4 class=\"h5 g-color-gray-dark-v4\">WAITING</h4></div>";

    $("#number").html(text);
}

displaynumber(number);