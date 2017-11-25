data = [
    { "Booth": "something", "QLength": 10 },
    { "Booth": "another", "QLength": 15 },
    { "Booth": "also", "QLength": 20 }
]

hottest = ["something", "another", "hot"]
least = ["something", "another", "hot"]

function tabulate(data, columns) {
    var table = d3.select('#chart').append('table').attr('class', "table table-striped u-table--v1 mb-0")
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .text(function (column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value; });

    return table;
}

function displayhottest(hottest) {
    var text = ""
    for (var i = 0; i < hottest.length; i++) {
        text += "<span class=\"u-label u-label-default g-mr-10 g-mb-15\">" + hottest[i] + "</span>";
    }
    $("#hottest").html(text);
}

function displayleast(least) {
    var text = ""
    for (var i = 0; i < hottest.length; i++) {
        text += "<span class=\"u-label u-label-default g-mr-10 g-mb-15\">" + hottest[i] + "</span>";
    }
    $("#least").html(text);
}



tabulate(data, ['Booth', 'QLength']); // 2 column table
displayhottest(hottest);
displayleast(least);