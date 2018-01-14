define(['d3', 'c3'], function (d3, c3)
{

    return function ()
    {
        var chart = c3.generate({
            bindto: "#piChart",
            data: {
                // iris data from R
                columns: [
                    ['data1', 30],
                    ['data2', 120],
                    ['data3', 99],
                ],
                type: 'pie',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
    }

});