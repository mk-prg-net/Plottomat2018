//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 10.1.2018
//
//  Projekt.......: Plottomat
//  Name..........: ExcptHndl.js
//  Aufgabe/Fkt...: Tools für die Fehlerbehandlung
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


define(function ()
{
    return {
        ThrowIfNot: function (cond, message)
        {

            if (!cond)
            {
                // Liefert Stacktrace
                console.trace(message);
                throw Error(message || "");
            }
        },

        ThrowIfNotInRange: function (val, beg, end, message)
        {
            if (val < beg || end < val)
            {
                // Liefert Stacktrace
                console.trace(message);
                throw RangeError("Value " + val.toString() + " not in Range [" + beg.toString() + ", " + end.toString() + "]" + (message || ""));
            }
        },

        ThrowIfNotOfType: function (obj, prototype, message)
        {
            if (obj instanceof prototype)
            {
                console.trace(message);
                throw TypeError(message);
            }
        }
    };
});