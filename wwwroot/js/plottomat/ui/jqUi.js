
//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 10.1.2018
//
//  Projekt.......: Plottomat
//  Name..........: jqUi.js
//  Aufgabe/Fkt...: Userinterface zum Konfigurieren von Plot- Jobs
//                  mittels JQuery ansteuern
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


define(['jquery', 'C3Plot', 'Job', 'fx/Compiler'], function ($, Plotter, Job, Compiler)
{
    return {
        plot: function ()
        {
            // Einlesen und Validieren der Formulardaten mittels jQuery "zu Fuss"
            // Starten des Plottens
            var inputVal = $("#a").val();
            var a = parseFloat(inputVal);
            if (!isNaN(a))
            {
                inputVal = $("#b").val();
                var b = parseFloat(inputVal);
                if (!isNaN(b))
                {

                    if (a <= b)
                    {

                        inputVal = $("#points").val();
                        var points = parseInt(inputVal);

                        if (!isNaN(points))
                        {

                            inputVal = $("#fTerm").val();

                            var f = Compiler.CreateJSFunctionFromTerm(inputVal);

                            var inc = (b - a) / points;

                            var xSer = ['x'];
                            var ySer = ['f'];

                            for (var x = a, i = 1; x <= b; x += inc, i++)
                            {
                                xSer[i] = x;
                                ySer[i] = f(x);
                            }

                            var job = Job.Create("x", xSer, "y", ySer);

                            Plotter(job, "#chart");
                            
                        } else
                        {
                            $("#points").val(inputVal + " is NaN !");
                            $("#points").addClass("invalid");
                        }
                    } else
                    {
                        $("#a").val("" + a + " must be <= " + b);
                        $("#a").addClass("invalid");
                    }

                } else
                {
                    $("#b").val(inputVal + " is NaN !");
                    $("#b").addClass("invalid");
                }
            } else
            {
                $("#a").val(inputVal + " is NaN !");
                $("#a").addClass("invalid");
            }
        },

        B1: function ()
        {
            // Beispiel erzeugen
            $("#fTerm").val("Math.sin(x) + Math.cos(2*x) + Math.sin(3*x) + Math.cos(4*x)");
            $("#a").val("0.0");
            $("#b").val((Math.PI * 4).toString());
            $("#points").val("200");
        },


        btnPlotReset_Click: function ()
        {
            // Alle Felder der Gui zurücksetzen
            if ($("#a").hasClass("invalid"))
            {
                $("#a").removeClass("invalid");
            }

            $("#a").val("");


            if ($("#b").hasClass("invalid"))
            {
                $("#b").removeClass("invalid");
            }

            $("#b").val("");

            $("#fTerm").val("");

            $("#fTerm").focus();
        }

    }
});