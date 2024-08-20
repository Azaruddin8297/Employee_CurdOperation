$(document).ready(function () {

    GetEmployees();
/*    $('#modal1').modal('show');
*/
   
});
function openModal() {
    $('#saveEmployeeBtn').show();
    $('#updateEmployeeBtn').hide();
    $('#modal1').modal('show');

}
function ClearModal() {
    $('#employeeName, #employeeCity, #employeeCountry, #employeeSalary, #employeeDepartment').val('');
 /*   $('#saveEmployeeBtn').show();
    $('#updateEmployeeBtn').hide();*/
}
function Edit(id) {
    $('#saveEmployeeBtn').hide();
    $('#updateEmployeeBtn').show();
    $.ajax({
        url: '/Home/Edit?id=' + id,
        type: 'Get',
        dataType: 'json',
        success: function (data) {
            $('#modal1').modal('show');
            $('#employeeName').val(data.name);
            $('#employeeCity').val(data.city);
            $('#employeeCountry').val(data.country);
            $('#employeeSalary').val(data.salary);
            $('#employeeDepartment').val(data.department);
            $('#employeeId').val(data.id);
            $('#saveEmployeeBtn').hide();
            $('#updateEmployeeBtn').show();


        },
        error: function (xhr, status, error) {
            $('#response').html('An error occurred: ' + error);
        }
    });
}
function AddEmployee() {
    $('#saveEmployeeBtn').show();
    $('#updateEmployeeBtn').hide();
    var obj = {
        Name: $('#employeeName').val(),
        City: $('#employeeCity').val(),
        Country: $('#employeeCountry').val(), // Fixed typo here
        Salary: $('#employeeSalary').val(),
        Department: $('#employeeDepartment').val()
    };

    $.ajax({

        url: '/Home/AddEmployee', 
        type: 'POST', 
        data: obj, 
        dataType: 'json',
        success: function (response) {
            $('#close_butoon').click();
            alert(response);
/*            $('#modal1').modal('hide');
        $('#employeeName, #employeeCity, #employeeCountry, #employeeSalary, #employeeDepartment').val('');
  */        ClearModal();          
            GetEmployees();
        },
        error: function (xhr, status, error) {
            $('#response').html('An error occurred: ' + error);
        }
    });
}
function GetEmployees() {
    $.ajax({
        url: '/Home/GetAllEmployee',
        type: 'GET', 
        dataType: 'json', 
        success: function (data) {
           

            var rows = ''; // Initialize a variable to store table rows

            $.each(data, function (index, item) {
                rows += '<tr>';
                rows += '<td>' + item.id + '</td>';
                rows += '<td>' + item.name + '</td>';
                rows += '<td>' + item.city + '</td>';
                rows += '<td>' + item.country + '</td>';
                rows += '<td>' + item.salary + '</td>';
                rows += '<td>' + item.department + '</td>';
                rows += '<td>';
                rows += '<button class="btn btn-info btn-sm edit-btn" onclick="Edit(' + item.id + ')">Edit</button> ';
                rows += '<button class="btn btn-danger btn-sm delete-btn" onclick="Delete(' + item.id + ')">Delete</button>';
                rows += '</td>';
                rows += '</tr>'; 
            });

            $('#table_data').html(rows); 
        },
        error: function (xhr, status, error) {
            $('#response').html('An error occurred: ' + error); 
        }
    });
}
function Delete(id) {
 
    let confirmDelete = confirm("Are you sure you want to delete this item?");
    debugger;
    if (confirmDelete) {
        $.ajax({
            url: '/Home/Delete?id=' + id,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                alert(data);
                GetEmployees();
            },
            error: function (xhr, status, error) {
                $('#response').html('An error occurred: ' + error);
            }
        });
    } else {
        alert("Deletion Failed");
    }

}
function Update() {
    var obj = {
        id: $('#employeeId').val(),
        Name: $('#employeeName').val(),
        City: $('#employeeCity').val(),
        Country: $('#employeeCountry').val(), // Fixed typo here
        Salary: $('#employeeSalary').val(),
        Department: $('#employeeDepartment').val()
    };

    $.ajax({
        url: '/Home/Update',
        type: 'POST',
        data: obj,
        dataType: 'json',
        success: function (response) {
            $('#close_butoon').click();
            alert(response);
/*            $('#employeeName, #employeeCity, #employeeCountry, #employeeSalary, #employeeDepartment').val('');
*/  ClearModal();
            GetEmployees();
        },
        error: function (xhr, status, error) {
            $('#response').html('An error occurred: ' + error);
        }
    });
}
