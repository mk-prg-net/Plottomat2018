//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 10.1.2017
//
//  Projekt.......: Plottomat
//  Name..........: plottomat.js
//  Aufgabe/Fkt...: Start der Plottomat- App.
//                  Strukturiert mit Require JS.
//                  Ui mit jQuery
//
//
//
//<unit_environment>
//------------------------------------------------------------------
//  Zielmaschine..: PC 
//  Betriebssystem: Windows 7 mit .NET 4.5
//  Werkzeuge.....: Visual Studio 2013
//  Autor.........: Martin Korneffel (mko)
//  Version 1.0...: 
//
// </unit_environment>
//
//<unit_history>
//------------------------------------------------------------------
//
//  Version.......: 1.1
//  Autor.........: Martin Korneffel (mko)
//  Datum.........: 
//  Änderungen....: 
//
//</unit_history>
//</unit_header>        


requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/js/plottomat',

    paths: { 
        "jquery": "../../lib/jquery/dist/jquery",
        "c3": "../c3",
        "d3": "../d3"       
    },

    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function ()
            {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});


// 2. Starten der Anwendung
requirejs(['ui/jQUi'], function (ui)
{
    $("#btnPlot").click(ui.plot);
    $("#btnPlotReset").click(ui.btnPlotReset_Click);
    $("#btnfTerm1").click(ui.B1);
});
