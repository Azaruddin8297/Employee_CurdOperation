using EmployeeModel.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace EmployeeModel.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _dbContext;
        public HomeController(ILogger<HomeController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetAllEmployee()
        {
            var employees = _dbContext.Employees.ToList();
            return new JsonResult(employees);
        }
        [HttpGet]
        public JsonResult Edit(int id)
        {
            var employee = _dbContext.Employees.Where(x => x.Id == id).SingleOrDefault();
          
            return new JsonResult(employee);
        }
        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            var emp = new Employee()
            {
                Id=employee.Id,
                Name = employee.Name,
                City = employee.City,
                Country = employee.Country,
                Salary = employee.Salary,
                Department = employee.Department
            };
            _dbContext.Employees.Update(emp);
            _dbContext.SaveChanges();
            return new JsonResult("Employee updated");
        }
        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                City = employee.City,
                Country = employee.Country,
                Salary = employee.Salary,
                Department = employee.Department
            };
            _dbContext.Employees.Add(emp);
            _dbContext.SaveChanges();
            return new JsonResult("New Employee Added");
        }
        [HttpGet]
        public JsonResult Delete(int id)
        {
            var employee = _dbContext.Employees.Where(x => x.Id == id).SingleOrDefault();
            if(employee != null)
            {
                _dbContext.Remove(employee);
                _dbContext.SaveChanges();
                return Json("Deleted");
            }
            else
            {
                return Json("Deletion failed");

            }

        }
    }
}