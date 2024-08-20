using System.ComponentModel.DataAnnotations;

namespace EmployeeModel.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public decimal Salary { get; set; }
        public string Department { get; set; }
    }

}

