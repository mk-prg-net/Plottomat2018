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
        public class PlotDataSet
        {
            public string id { get; set; }
            public string fTerm { get; set; }
            public double a { get; set; }
            public double b { get; set; }
            public double maxPoints { get; set; }
            public string created { get; set; }
        }


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

                if (orderedPlots.Any())
                {
                    return View(orderedPlots);
                }
                else
                {
                    return View(new PlotDataSet[] { });
                }
            }
            catch (Exception ex)
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
            var pds = new PlotDataSet { fTerm = "x*x*x", a = -10, b = 10, maxPoints = 100, created = DateTime.Now.ToString() };
            return View(pds);
        }


        [HttpPost]
        public ActionResult Save([FromBody] PlotDataSet pds)
        {
            JsonResult res = null;
            try
            {
                pds.id = Guid.NewGuid().ToString();

                var fname = $"{pds.id}.json";

                using (var writer = new System.IO.StreamWriter($".\\PlotBase\\{fname}"))
                {
                    writer.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(pds, Newtonsoft.Json.Formatting.Indented));
                }
                res = new JsonResult(pds);
                res.StatusCode = new int?(201);                

            } catch(Exception ex)
            {
                res = new JsonResult(new { ex = ex.Message });
                res.StatusCode = new int?(500);                
            }

            return res;
        }

        public ActionResult Delete(string id)
        {
            var fname = $"{id}.json";

            if (System.IO.File.Exists($".\\PlotBase\\{fname}"))
            {
                System.IO.File.Delete($".\\PlotBase\\{fname}");
            }

            return new RedirectResult("/Plot/Index");
        }


        public ActionResult Load(string id)
        {
            var fname = $"{id}.json";

            using (var reader = new System.IO.StreamReader($".\\PlotBase\\{fname}"))
            {
                var Json = reader.ReadToEnd();
                var pds = Newtonsoft.Json.JsonConvert.DeserializeObject<PlotDataSet>(Json);
                return View("VueDemo", pds);
            }
        }
    }
}