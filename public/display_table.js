data = [];
hottest = [];
least = [];

$(document).on('ready', function () {

    $.ajax( "/api/allqlength", {
        method: "GET"
    } ).done( function(data) {
        hottest = [ data[0].boothname, data[1].boothname, data[2].boothname ];
        displayhottest(hottest);
        data = data;
        tabulate(data, ['boothname', 'QLength']);
        for(var i = data.length - 1; i > Math.max(data.length - 4,0); i --) {
            least.push( data[i].boothname );
        }
        displayleast(least);
    });

});

function tabulate(data, columns) {
    var table = d3.select('#chart').append('table').attr('class', "table table-striped u-table--v1 mb-0")
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    var header = ["Booth name", "Queue Length"];

    // append the header row
    thead.append('tr')
        .selectAll('th')
        .data(header).enter()
        .append('th')
        .text(function (header) { return header; });

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
        .text(function (d) { return d.value; })
        .attr("xlink:href", "./customer_enqueue.html");

    return table;
}

function parseHistoryData(queueData) {
    var dayMap = new Map();
    for(var i = 0; i < queueData.Q; ++i) {
        var day = queueData.Q[i]["time"].getDate();
        var hour = queueData.Q[i]["time"].getHours();
        if (dayMap.has(day)){
            if (dayMap.get(day).has(hours)){
                dayMap.get(day).get(hours).push(queueData.Q[i]);
            } else {
                var hourMap = new Map();
                hourMap.set(hour, [queueData.Q[i]]);
            }
        } else {
            var hourMap = new Map();
            hourMap.set(hour, [queueData.Q[i]]);
            dayMap.set(day, hourMap);
        }
    }
    var rows = [];
    dayMap.forEach(function (hourMaps, day, map){
        var dayTotal = 0;
        var leastHour = 0;
        var mostHour = 0;
        var leastHourAmount = 1000000;
        var mostHourAmount = 0;
        for (var hour in hourMaps) {
            var hourTotal = 0;
            for (var i = 0; i < hourMaps.get(hour).length; ++i){
                hourTotal += hourMaps.get(hour)[i].groupsize;
            }
            dayTotal += hourTotal;
            if (hourTotal >= mostHourAmount) {
                mostHour = hour;
                mostHourAmount = hourTotal;
            }
            if (hourTotal <= leastHourAmount){
                leastHour = hour;
                leastHourAmount = hourTotal;
            }
        }
        var row = {
            Date: day,
            Total: dayTotal,
            Rush_hour: mostHour,
            Slack_hour: leastHour
        };
        rows.push(row);
    });
    return rows;
}

function displayhottest(hottest) {
    var text = ""
    for (var i = 0; i < hottest.length; i++) {
        text += `<a class='btn btn-xl u-btn-darkgray g-mr-10 g-mb-15' href=./customer_enqueue.html?boothname=${encodeURI(hottest[i])}>` + hottest[i] + "</a>";
    }
    $("#hottest").html(text);
}

function displayleast(least) {
    var text = ""
    for (var i = 0; i < least.length; i++) {
        text += `<a class='btn btn-xl u-btn-darkgray g-mr-10 g-mb-15' href=./customer_enqueue.html?boothname=${encodeURI(least[i])}>` + least[i] + "</a>";
    }
    $("#least").html(text);
}

//tabulate(data, ['Booth', 'QLength']); // 2 column table
// displayhottest(hottest);
// displayleast(least);