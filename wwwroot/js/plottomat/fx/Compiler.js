

define(function ()
{
    return {
        // mko, 6.1.2018
        // Klassenfabrik, die zu einem gegebenen mathematischen Term mit einer 
        // veränderlichen x eine JavaScript Funktionsobjekt erzeugt.
        // Die Terme sollten Abbildungsvorschriften für Funktionen der 
        // Art f: x -> f(x)
        CreateJSFunctionFromTerm: function (fxTermAsString)
        {
            "use strict"
            var $ = null;
            var _ = null;
            var window = null;

            var f = null;

            // Term in einem JavaScript- Funktionsobjekt verpacken
            eval("f = function(x) { return " + fxTermAsString + ";};");

            return f;
        },

    }
});


