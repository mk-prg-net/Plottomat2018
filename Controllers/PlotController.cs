using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Plottomat.Controllers
{
    public class PlotController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult VueDemo()
        {
            return View();
        }
    }
}