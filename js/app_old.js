var app = angular.module('myapp', []);

app.controller('Ctrl', function($scope,$timeout,$http) {

    //Data structure used by ng-repeat to update view
    $scope.databoard = [{
        id: 458992,
        type: 'checkin',
        date: '6/18/2014 10:20pm',
        past: 40,
        name: 'cjack',
        state: 'Running',
        metrics: 90,
        metrics_data : {Test : 83 , Maintainablity:  91 , Security: 70 , Workmanship:65},
        metrics_state:'running',
        build: 'notrun',
        build_date: '6/18/2014-09:11am',
        unit_test_perc: 85,
        unit_test: 'notrun',
        unit_test_coverage: 91,
        func_test_perc: 93,
        funcional_test: 'notrun',
        funcional_test_coverage: 95,
        button_data:'Stop Run',
        result_reason: "",
        result_data: "Running"
    },
    {
        id: 'Tenrox-R1_189',
        type: 'build',
        date: '',
        past: 40,
        name: '',
        state: 'Pending',
        metrics: 90,
        metrics_data : {Test : 93 , Maintainablity:  91 , Security: 70 , Workmanship:65},
        metrics_state:'notrun',
        build: 'notrun',
        build_date: '6/18/2014-10:21am',
        unit_test_perc: 85,
        unit_test: 'notrun',
        unit_test_coverage: 91,
        func_test_perc: 93,
        funcional_test: 'notrun',
        funcional_test_coverage: 95,
        button_data:'Cancel Run',
        result_reason: "",
        result_data: "Pending"
    },
    {
        id: 978993,
        type: 'checkin',
        date: '6/18/2014 11:23pm',
        past: 40,
        name: 'tsmith',
        state: 'Accepted',
        metrics: 90,
        metrics_data : {Test : 93 , Maintainablity:  91 , Security: 70 , Workmanship:65},
        metrics_state:'pass',
        build: 'pass',
        build_date: '6/18/2014-03:01am',
        unit_test_perc: 85,
        unit_test: 'pass',
        unit_test_coverage: 91,
        func_test_perc: 93,
        funcional_test: 'pass',
        funcional_test_coverage: 95,
        button_data:'Merged Build',
        result_reason: "Change accepted",
        result_data: "Auto-merged"
    }, 
    {
        id: 723656,
        type: 'checkin',
        date: '6/17/2014 10:21am',
        past: 40,
        name: 'bmiller',
        state: 'Rejected',
        metrics: 40,
        metrics_data : {Test : 83 , Maintainablity:  31 , Security: 70 , Workmanship:65},
        metrics_state:'fail',
        build: 'pass',
        build_date: '6/17/2014-11:51am',
        unit_test_perc: 85,
        unit_test: 'pass',
        unit_test_coverage: 40,
        func_test_perc: 81,
        funcional_test: 'pass',
        funcional_test_coverage: 79,
        button_data:'Find Issues',
        result_reason: "Change rejected",
        result_data: "Metrics Reduction"
    }, 
    {
        id: 703657,
        type: 'checkin',
        date: '6/17/2014 09:11am',
        past: 40,
        name: 'kate',
        state: 'Rejected',
        metrics: 60,
        metrics_data : {Test : 89 , Maintainablity:  91 , Security: 61 , Workmanship:57},
        metrics_state:'pass',
        build: 'fail',
        build_date: '6/17/2014-06:34am',
        unit_test_perc: 21,
        unit_test: 'notrun',
        unit_test_coverage: 81,
        func_test_perc: 89,
        funcional_test: 'notrun',
        funcional_test_coverage: 90,
        button_data:'Find Issues',
        result_reason: "Change rejected",
        result_data: "Build Failure"
    }, 
    {
        id: "TenroxR1_456",
        type: 'build',
        date: '6/16/2014 04:05am',
        past: 80,
        name: '',
        state: 'Accepted',
        metrics: 70,
        metrics_data : {Test : 97 , Maintainablity:  84 , Security: 50 , Workmanship:65},
        metrics_state:'pass',
        build: 'pass',
        build_date: '6/16/2014-13:23am',
        unit_test_perc: 83,
        unit_test: 'pass',
        unit_test_coverage: 74,
        func_test_perc: 90,
        funcional_test: 'pass',
        funcional_test_coverage: 89,
        button_data:'Deploy to',
        result_reason: "",
        result_data: "Complete"
    }];

    //Create Pie chart
    $scope.create_graph = function() {
        var values = [],
            labels = [];

        for (var i = 0; i < $scope.databoard.length; i++) {
            values = [$scope.databoard[i].unit_test_perc, 100 - $scope.databoard[i].unit_test_perc];
            labels = [$scope.databoard[i].unit_test_perc.toString() + '%', (100 - $scope.databoard[i].unit_test_perc).toString() + '%']
            Raphael(document.getElementById('pie-holder' + (i + 1).toString() + '1'), 150, 150).pieChart(55, 65, 50, values, labels, "#fff");
            values = [$scope.databoard[i].func_test_perc, 100 - $scope.databoard[i].func_test_perc];
            labels = [$scope.databoard[i].func_test_perc.toString() + '%', (100 - $scope.databoard[i].func_test_perc).toString() + '%']
            Raphael(document.getElementById('pie-holder' + (i + 1).toString() + '2'), 150, 150).pieChart(55, 65, 50, values, labels, "#fff");

        }
    };


    
    //Methods to return color classes to ng-class
    $scope.getResultColor = function(index) {
        if ($scope.databoard[index].state == 'Accepted' && $scope.databoard[index].type == 'checkin') {
            return 'yellow';
        } else if ($scope.databoard[index].state == 'Accepted') {
            return 'green';
        } else if ($scope.databoard[index].state == 'Running') {
            return 'blue';
        } else if ($scope.databoard[index].state == 'Pending') {
            return 'gray';
        } else {
            return 'red';
        }

    }

    $scope.getDataColor = function(index) {
        if ($scope.databoard[index].build == 'pass') {
            return 'green';
           } else {
            return 'red';
           }
    }

    $scope.getBlockColor = function(index) {
        if ($scope.databoard[index].state == 'Accepted') {
            return 'greenblock';
        } else if ($scope.databoard[index].state == 'Rejected') {
            return 'redblock';
        } else if ($scope.databoard[index].state == 'Pending') {
            return 'grayblock';
        } else if ($scope.databoard[index].state == 'Running') {
            return 'blueblock';
        }

    }

    $scope.getHeadColor = function(index) {
        if ($scope.databoard[index].state == 'Accepted') {
            return 'green';
        } else if ($scope.databoard[index].state == 'Rejected') {
            return 'red';
        } else if ($scope.databoard[index].state == 'Pending') {
            return 'gray';
        } else if ($scope.databoard[index].state == 'Running') {
            return 'blue';
        }
    }

     $scope.getSpaceCount = function(index,param) {
        if(param == 'thirdTitle')
        {
            if ($scope.databoard[index].type == 'build') {
                return 'buildspace';
            } else {
                return 'nospace';
            } 
        } else {
            if ($scope.databoard[index].state == 'Pending') {
                return 'pendingspace';
            } else {
                return 'nospace';    
            }           
        }
      }

    $scope.getBgColor = function(index,param) {
         
     if($scope.databoard[index][param] == 'pass') {
        return 'greenback';
     } else if($scope.databoard[index][param] == 'fail') {
        return 'redback';
     } else if($scope.databoard[index][param] == 'notrun') {
        return 'grayback';
     } else if($scope.databoard[index][param] == 'running') {
        return 'blueback';
     }

    }

    $scope.getBorderColor = function(index,param) {
         
     if($scope.databoard[index][param] == 'pass') {
        return 'greenborder';
     } else if($scope.databoard[index][param] == 'fail') {
        return 'redborder';
     } else if($scope.databoard[index][param] == 'notrun') {
        return 'invisible';
     } else if($scope.databoard[index][param] == 'running') {
        return 'blueborder';
     }

    }

   
    //Make HTTP requests and update view every 2 seconds if in "nobackend" mode
    var ajax_call = function() { 
                $scope.model = new Date().getTime() 
                $timeout(ajax_call, 2000);
                var responsePromise = $http.get("/data");
                responsePromise.success(function(data, status, headers, config) {
                      $scope.databoard[3].func_test_perc = data;
                });
                responsePromise.error(function(data, status, headers, config) {
          
                });
    }
     if(document.URL.match(/\?nobackend/)) {
         ajax_call();
    }
    





 

});

//Main directive
app.directive('dynamic', ['$interval',
    function($interval, $compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, ele, attrs) {

                //Call to create pie graphs 250ms after page load, 
                //this is a temporary arrangemnt to create pie graphs, ideally the directive would create / update them

                $interval(scope.create_graph, 250, 1);
    
               

            }
        };
    }
]);

//Directive to create and update piegraphs
app.directive('piegraph', [
    function($compile) {
        return {
            restrict: 'A',
            replace: false,
         
            link: function(scope, ele, attrs) {
            
            var re = /pie-holder-(\d+)-(\d+)/;
            var myArray = attrs.piegraph.match(re);
            var second_index = myArray[2];
            var first_index = myArray[1];
            var call_raphael = function() {
                values = [percent, 100 - percent];
                labels = [percent + '%', (100 - percent) + '%'];
                Raphael(ele[0], 150, 150).pieChart(55, 65, 50, values, labels, "#fff");
            }

            var percent = 0;
            var values = [],
            labels = [];

            if(attrs.type == 'func_test')
            {
                percent = scope.databoard[first_index - 1].func_test_perc ;

                //Look for changes in pie graph data  and update view
                scope.$watch(function(){return scope.databoard[first_index - 1].func_test_perc;}, function() {
                      
             //       call_raphael();
                },true);
              
            }
            else
            {
                
                percent = scope.databoard[first_index - 1].unit_test_perc ;
                //Look for changes in pie graph data  and update view
                scope.$watch(scope.databoard[first_index - 1].unit_test_perc, function() {
                    //     call_raphael();
                });

            }

   
            }
        };
    }
]);

//Directive to create and update sliders
app.directive('slider', [
    function($compile,$parse) {
        return {
            restrict: 'A',
            replace: false,
            compile : function (ele, attrs) { 
            return function(scope, ele, attrs) {
            
                var re = /slider-(\d+)-(\d+)/;
                var myArray = attrs.slider.match(re);
                var second_index = myArray[2];
                var first_index = myArray[1];
                var percent = 0;

                if(attrs.type == 'func_test')
                {
                    percent = scope.databoard[first_index - 1].funcional_test_coverage ;
                }
                else
                {
                    percent = scope.databoard[first_index - 1].unit_test_coverage ;
                }
                     
                var slidebar_elem = angular.element(ele.children()[0]);
                slidebar_elem.css({
                    'width' : percent + '%'
                 });
                var slidebar_result = angular.element(ele.children()[1]);
                slidebar_result.html(percent + '%' + '<div class="test-coverage">code covered</div>');
        
            };

            }

        };
    }
]);
