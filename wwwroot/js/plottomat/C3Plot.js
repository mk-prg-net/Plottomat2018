//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 10.1.2018
//
//  Projekt.......: Plottomat.js
//  Name..........: C3Plot.js
//  Aufgabe/Fkt...: Grafische Ausgabe einer Funktion als
//                  
//
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

define(['d3', 'c3'], function(d3, c3)
{
    return function (job, idDivForChart)
    {
        var chart = c3.generate({
            bindto: idDivForChart,
            data: {
                x: 'x',
                columns: [
                    job.xSer,
                    job.ySer
                ]
            }

        });

    }
});