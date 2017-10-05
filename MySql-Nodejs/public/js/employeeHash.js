var HashMap = require('hashmap');

var employeeRepository = {
   employee: null,
   initialDetails: function(){
	 console.log("employee is initialised");
	 this.employee = new HashMap();	
   },
   empId: 101,
   saveEmp: function(emp){
      console.log("Employee Saved"+emp);
	  this.employee.set(empId,JSON.stringify(emp));
	  empId += 1;
   },
   getEmp: function(){
	   return this.emp.entries();
   }
}
employeeRepository.initialDetails();