//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 10.1.2018
//
//  Projekt.......: Plottomat
//  Name..........: Job.js
//  Aufgabe/Fkt...: Definiert einen Auftrag für einen Plotter
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


define(['utils/ExcptHndl'], function (ExcptHndl)
{
    var JobPrototype = Object.create({});
    JobPrototype.Name = "Job";

    return {
        Create: function (xDescr, xSer, yDescr, ySer)
        {
            ExcptHndl.ThrowIfNot('length' in xSer, "xSer is not a Array");
            ExcptHndl.ThrowIfNot('length' in ySer, "xSer is not a Array");
            ExcptHndl.ThrowIfNot(xSer.lenght === ySer.lenght, "xSer.lenght != ySer.lenght!");


            var job = Object.create(JobPrototype);

            job.xDescr = xDescr || "x";
            job.xSer = xSer;
            job.yDescr = yDescr || "y";
            job.ySer = ySer;

            return job;
        }
    };
});