using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.IO;
using System.Diagnostics;

namespace Plottomat.Controllers
{
    public class PlotController : Controller
    {
        public IActionResult Index()
        {
            try
            {
                var jsons = Directory.GetFiles(@".\PlotBase").Where(r => Path.GetExtension(r).ToLower() == ".json");

                var plots = jsons.Select(r =>
                {
                    PlotDataSet pds = null;
                    using (var reader = new StreamReader(r))
                    {
                        var txt = reader.ReadToEnd();
                        pds = Newtonsoft.Json.JsonConvert.DeserializeObject<PlotDataSet>(txt);
                    }
                    return pds;
                });

                var orderedPlots = plots.OrderBy(r => long.Parse(r.created)).ToArray();
                
                if(orderedPlots.Any())
                {
                    return View(orderedPlots);
                }                    
                else
                {
                    return View(new PlotDataSet[] { });
                }
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }            
        }

        public IActionResult JQDemo()
        {
            return View();
        }

        public IActionResult VueDemo()
        {
            return View();
        }

        public class PlotDataSet
        {
            public string fTerm {get; set;}
            public double a { get; set; }
            public double b { get; set; }
            public double maxPoints { get; set; }
            public string created { get; set; }
        }

        [HttpPost]
        public void Save(string JSon)
        {
            var pds = Newtonsoft.Json.JsonConvert.DeserializeObject<PlotDataSet>(JSon);
            var fname = $"{Guid.NewGuid().ToString()}.json";

            using (var writer = new System.IO.StreamWriter($".\\PlotBase\\{fname}"))
            {
                writer.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(pds, Newtonsoft.Json.Formatting.Indented));
            }            
        }
    }
}