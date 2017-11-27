var app = angular.module('employeeApp',[]);
// empolyee controller used to save and cancel data
app.controller('empController',function($scope,$http){
   $scope.emplist = { "empFName":"" ,"empLName":"","designation": "","locationName": "","qualification": "","percentage": ""};
   $scope.employees = [];
   //click save button and data store into employees scope variable
	$scope.saveEmp = function(){
	    var empData = $scope.emplist;
		//$scope.emplist = { "empFName":"" ,"empLName":"","designation": "","locationName": "","qualification": "","percentage": ""};
		$http.post('/saveEmployee',$scope.emplist).then(function(res) {
			debugger;
                    console.log(data);
                },
                function(res) {
                    alert("AJAX failed!");
                });
	}
	$scope.cancelEmp = function(){
		$scope.emplist = { "empFName":"" ,"empLName":"","designation": "","locationName": "","qualification": "","percentage": ""};
	}
});
// creating pie chart directive for employee based data
app.directive('linearChart', function($window){
   return{
      restrict:'EA',
      template:"<svg></svg><div ng-click=\"createChart()\" class=\"chartBtn\">CreateChart</div>",
       controller: function ($scope, $element, $attrs, $location) {
		   $scope.createChart = function(){
           var salesDataToPlot=$scope.employees;
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;
if(salesDataToPlot.length > 0){
           var d3 = $window.d3;
		   $element.find('svg').attr('style','width:850px;height:300px;');
           var rawSvg=$element.find('svg');
           var svg = d3.select(rawSvg[0]);
    width = 850,
    height = 300,
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.count; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var groupedByDate = [];
var values = [];
for (var key in salesDataToPlot) {
    var date = salesDataToPlot[key].qualification; 
	
    if (values.indexOf(date)) {
	values.push(date);
        groupedByDate.push({"qualification":date,"count":1});
    }else{
		groupedByDate[values.indexOf(date)].count +=1; 
	}
}
  
  var arc = g.selectAll(".arc")
    .data(pie(groupedByDate))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.qualification); });
	  

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ") rotate(30)"; })
      .attr("dx", "-1.35em")
	  .attr("fill",'white')
      .text(function(d) { return (d.data.qualification+":"+d.data.count); });
       }
		   }
	   }
   };
});