//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 10.1.2017
//
//  Projekt.......: Plottomat
//  Name..........: plottomatVue.js
//  Aufgabe/Fkt...: Start der Plottomat- App.
//                  Strukturiert mit Require JS.
//                  Ui mit Vue
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
        "d3": "../d3",
        "vue": "../vue",
        "vee": "../vee-validate"
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
requirejs(['fx/Compiler', 'Job', 'C3Plot', 'vue', 'vee', 'jquery'], function (Compiler, Job, Plotter, Vue, Vee, $)
{
    Vue.use(Vee);

    var app = new Vue({
        // ID des Containers, der die Html- View umschließt
        el: "#App",
        data: {
            fTerm: "x*x",
            a: 0,
            b: 100,
            maxPoints: 100,
            Fehlerbericht : "keine"
        },
        methods: {
            B1: function ()
            {
                this.fTerm = "Math.sin(x) + Math.cos(2*x) + Math.sin(3*x) + Math.cos(4*x)";
                this.a = 0.0;
                this.b = Math.PI * 4;
                this.maxPoints = 100;
            },
            plot: function ()
            {
                if (!this.errors.any())
                {                    

                    var f = Compiler.CreateJSFunctionFromTerm(this.fTerm);

                    var inc = (this.b - this.a) / this.maxPoints;

                    var xSer = ['x'];
                    var ySer = ['f'];

                    for (var x = this.a, i = 1; x <= this.b; x += inc, i++)
                    {
                        xSer[i] = x;
                        ySer[i] = f(x);
                    }

                    var job = Job.Create("x", xSer, "y", ySer);

                    Plotter(job, "#chart");
                } 

            },
            reset: function() {
                this.fTerm = "x*x";
                this.a = 0;
                this.b = 0;
                this.maxPoints = 100;
            },
            save: function ()
            {
                var url = $("#btnSave").attr("data-websrv-url");

                var pds = {
                    fTerm: this.fTerm,
                    a: this.a,
                    b: this.b,
                    maxPoints: this.maxPoints,
                    created: Date.now().toString()
                }

                var msg = "JSon=" + JSON.stringify(pds);

                $.ajax({
                    type: "POST",
                    //dataType: "json",
                    url: url,
                    data: msg,
                    cache: false
                }).done(function (Data, status, req)
                {

                    // Es hat geklappt
                    console.log("Save ok");
                    console.log(Data.toString());
                    var Result = JSON.parse(Data);

                    //$("#calcResult").html('<span class="glyphicon glyphicon-time"></span>&nbsp;' + Result.Result.toString());

                }).fail(function (jqXHR, textStatus, errorThrown)
                {

                    // Leider ein Fehler
                    console.log("Save fehlgeschlagen");
                    console.log(jqXHR.status.toString());
                });

            }
        }
    });

    

    
});
