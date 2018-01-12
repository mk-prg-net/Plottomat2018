//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 11.1.2018
//
//  Projekt.......: Plottomat
//  Name..........: PlotDataSet.js
//  Aufgabe/Fkt...: Speichert alle Informationen über einen Plot
//                  zwecks Archivierung
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

define(['utils/ExcptHndl'], function (ExcptHndl)
{
    var DsPrototype = Object.create({});
    DsPrototype.Name = "PlotDataSet";

    return {
        Create: function (fTerm, a, b, maxPoints)
        {
            ExcptHndl.ThrowIfNot(typeof fTerm === "String", "fTerm is not a function term");
            ExcptHndl.ThrowIfNot(typeof a === "Number", "a is not a Number");
            ExcptHndl.ThrowIfNot(typeof b === "Number", "b is not a Number");
            ExcptHndl.ThrowIfNot(typeof maxPoints === "Number", "maxPoints is not a Number");
            ExcptHndl.ThrowIfNot(a <= b, "a is not lower or equal b");
            
            var ds = Object.create(DsPrototype);

            ds.fTerm = fTerm;
            ds.a = a;
            ds.b = b;
            ds.maxPoints = maxPoints;
            ds.created = Date.now.toString();

            return ds;
        }
    };
});