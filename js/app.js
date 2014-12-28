var app = angular.module('myapp', []);

app.controller('Ctrl', function($scope, $timeout, $http) {

 
    //Data structure used by ng-repeat to update view
    $scope.databoard = [{
        id: 458992,
        type: 'firewall',
        date: '6/18/2014 10:20pm',
        owner: 'jtuck',
        state: 'Running',
        metrics: {
            state: 'Running',
            data: {
                test: 83,
                maintainablity: 93,
                security: 71,
                workmanship: 60
            }
        },
        build: {
            state: 'notrun',
            date:'',
        },
        unit_test: {
            state:'notrun',
            tests_passed : 0,
            tests_failed: 0,
            test_count:0,
            tests_covered:0
        },
        functional_test:{
            state: 'notrun',
            tests_passed : 0,
            tests_failed: 0,
            test_count: 0,
            tests_covered: 0
        },
        result_reason: "",
        result: "Running"
    }, {
        id: 'Tenrox-R1_189',
        type: 'build',
        date: ' ',
        owner: ' ',
        state: 'Pending',
        metrics: {
            state: 'notrun',    
            data: {
                test: 0,
                maintainablity: 0,
                security: 0,
                workmanship: 0
            }
        },
        build: {
            state: 'notrun',
            date: '',
        },
        unit_test: {
            state:'notrun',
            tests_passed : 0,
            tests_failed: 0,
            test_count: 0,
            tests_covered:0
        },
        functional_test:{
            state: 'notrun',
            tests_passed : 0,
            tests_failed: 0,
            test_count: 0,
            tests_covered: 0
        },
        result_reason: "",
        result: "Pending"
    }, {
        id: 978993,
        type: 'firewall',
        date: '6/18/2014 11:23pm',
        owner: 'tsmith',
        state: 'Accepted',
        metrics: {
            state: 'pass',    
            data: {
                test: 93,
                maintainablity: 87,
                security: 73,
                workmanship: 57
            }
        },
        build: {
            state: 'pass',
            date: '6/18/2014-03:01am',
        },
        unit_test: {
            state:'pass',
            tests_passed : 250,
            tests_failed: 40,
            test_count:450,
            tests_covered:290
        },
        functional_test:{
            state: 'pass',
            tests_passed : 190,
            tests_failed: 20,
            test_count:260,
            tests_covered:210
        },
        result_reason: "Change accepted",
        result: "Auto-merged"
    }, {
        id: 723656,
        type: 'firewall',
        date: '6/17/2014 10:21am',
        owner: 'cjack',
        state: 'Rejected',
        metrics: {
            state: 'fail',
            data: {
                test: 83,
                maintainablity: 31,
                security: 70,
                workmanship: 65
            }        
        },
        build: {
            state: 'pass',
            date: '6/17/2014-11:51am',
        },
        unit_test: {
            state:'pass',
            tests_passed : 170,
            tests_failed: 30,
            test_count:275,
            tests_covered: 200
        },
        functional_test:{
            state: 'pass',
            tests_passed : 490,
            tests_failed: 30,
            test_count:700,
            tests_covered: 520
        },
        result_reason: "Change rejected",
        result: "Metrics Reduction"
    }, {
        id: 703657,
        type: 'firewall',
        date: '6/17/2014 09:11am',
        owner: 'samy',
        state: 'Rejected',
        metrics: {
            state: 'pass',    
            data: {
                test: 86,
                maintainablity: 85,
                security: 61,
                workmanship: 57
            }
        },
        build: {
            state: 'fail',
            date: '6/17/2014-06:34am',
        },
        unit_test: {
            state:'notrun',
            tests_passed : 0,
            tests_failed: 0,
            test_count: 0,
            tests_covered:0
        },
        functional_test:{
            state: 'notrun',
            tests_passed : 0,
            tests_failed: 0,
            test_count: 0,
            tests_covered: 0
        },
        result_reason: "Change rejected",
        result: "Build Failure"
    }, {
        id: "Tenrox-R1_456",
        type: 'build',
        date: '6/16/2014 04:05am',
        owner: '',
        state: 'Complete',
        metrics: {
            state: 'pass',    
            data: {
                test: 97,
                maintainablity: 84,
                security: 50,
                workmanship: 65
            }
        },
        build: {
            state: 'pass',
            date: '6/16/2014-13:23am',
        },
        unit_test: {
            state:'pass',
            tests_passed : 252,
            tests_failed: 51,
            test_count:200,
            tests_covered:180
        },
        functional_test:{
            state: 'pass',
            tests_passed : 80,
            tests_failed: 10,
            test_count:150,
            tests_covered: 90
        },
        result_reason: "",
        result: "Complete"
    }];



    for (var i = 0; i < $scope.databoard.length; i++) {
     //   console.log($scope.databoard[i].result);
          if($scope.databoard[i].state == 'Complete') {
            $scope.databoard[i].options = "Deploy to"
          } else if ($scope.databoard[i].state == 'Rejected') {
            $scope.databoard[i].options = "Find Issues"
          } else if ($scope.databoard[i].state == 'Accepted') {
            $scope.databoard[i].options = "Merged Build"
          } else if ($scope.databoard[i].state == 'Pending') {
            $scope.databoard[i].options = "Cancel Run"
          } else if ($scope.databoard[i].state == 'Running') {
            $scope.databoard[i].options = "Stop Run"
          }

    };


    //Create Pie chart
    $scope.create_graph = function() {
        var values = [],
            labels = [];

        for (var i = 0; i < $scope.databoard.length; i++) {
            values = [$scope.databoard[i].unit_test.tests_passed, $scope.databoard[i].unit_test.tests_failed];
            labels = [$scope.databoard[i].unit_test.tests_passed.toString() , $scope.databoard[i].unit_test.tests_failed.toString() ];
            Raphael(document.getElementById('pie-holder' + (i + 1).toString() + '1'), 150, 150).pieChart(55, 65, 50, values, labels, "#fff");
            values = [$scope.databoard[i].functional_test.tests_passed, $scope.databoard[i].functional_test.tests_failed];
            labels = [$scope.databoard[i].functional_test.tests_passed.toString() , $scope.databoard[i].functional_test.tests_failed.toString() ];
            Raphael(document.getElementById('pie-holder' + (i + 1).toString() + '2'), 150, 150).pieChart(55, 65, 50, values, labels, "#fff");

        }
    };



    //Methods to return color classes to ng-class
    $scope.getResultColor = function(index) {
        if ($scope.databoard[index].state == 'Accepted' && $scope.databoard[index].type == 'firewall') {
            return 'yellow';
        } else if ($scope.databoard[index].state == 'Complete') {
            return 'green';
        } else if ($scope.databoard[index].state == 'Running') {
            return 'blue';
        } else if ($scope.databoard[index].state == 'Pending') {
            return 'gray';
        } else {
            return 'red';
        }

    }

 
    $scope.getBlockColor = function(index) {
        if ($scope.databoard[index].state == 'Accepted'  || $scope.databoard[index].state == 'Complete') {
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
        if ($scope.databoard[index].state == 'Accepted'  || $scope.databoard[index].state == 'Complete') {
            return 'green';
        } else if ($scope.databoard[index].state == 'Rejected') {
            return 'red';
        } else if ($scope.databoard[index].state == 'Pending') {
            return 'gray';
        } else if ($scope.databoard[index].state == 'Running') {
            return 'blue';
        }
    }

          

     $scope.getTabHeadColor = function(index,param1,param2) {
        if ($scope.databoard[index][param1][param2] == 'pass') {
            return 'green';
        } else if ($scope.databoard[index][param1][param2] == 'fail') {
            return 'red';
        } else if ($scope.databoard[index][param1][param2] == 'pending') {
            return 'gray';
        } else if ($scope.databoard[index][param1][param2] == 'Running') {
            return 'blue';
        }
    }
    

    $scope.getSpaceCount = function(index, param) {
        if (param == 'thirdTitle') {
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

         

    $scope.getBgColor = function(index, param1 , param2) {

        if ($scope.databoard[index][param1][param2] == 'pass') {
            return 'greenback';
        } else if ($scope.databoard[index][param1][param2] == 'fail') {
            return 'redback';
        } else if ($scope.databoard[index][param1][param2] == 'notrun') {
            return 'grayback';
        } else if ($scope.databoard[index][param1][param2] == 'Running') {
            return 'blueback';
        }

    }


    

           

     $scope.getBorderColor = function(index, param1 , param2) {

        if ($scope.databoard[index][param1][param2] == 'pass') {
            return 'greenborder';
        } else if ($scope.databoard[index][param1][param2] == 'fail') {
            return 'redborder';
        } else if ($scope.databoard[index][param1][param2] == 'notrun') {
            return 'invisible';
        } else if ($scope.databoard[index][param1][param2] == 'Running') {
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
    if (document.URL.match(/\?nobackend/)) {
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

                if (attrs.type == 'func_test') {
                    percent = scope.databoard[first_index - 1].func_test_perc;

                    //Look for changes in pie graph data  and update view
                    scope.$watch(function() {
                        return scope.databoard[first_index - 1].func_test_perc;
                    }, function() {

                        //       call_raphael();
                    }, true);

                } else {

                    percent = scope.databoard[first_index - 1].unit_test_perc;
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

    function($compile, $parse) {
        return {
            restrict: 'A',
            replace: false,
            compile: function(ele, attrs) {
                return function(scope, ele, attrs) {

                    var re = /slider-(\d+)-(\d+)/;
                    var myArray = attrs.slider.match(re);
                    var second_index = myArray[2];
                    var first_index = myArray[1];
                    scope.percent = 0;

                    if (attrs.type == 'func_test') {
                        scope.percent = parseInt(100 * scope.databoard[first_index - 1].functional_test.tests_covered / (scope.databoard[first_index - 1].functional_test.test_count ));
                    } else {
                        scope.percent = parseInt(100 * scope.databoard[first_index - 1].unit_test.tests_covered / (scope.databoard[first_index - 1].unit_test.test_count ));
                    }

                    var slidebar_elem = angular.element(ele.children()[0]);
                    slidebar_elem.css({
                        'width': scope.percent + '%'
                    });
                    var slidebar_result = angular.element(ele.children()[1]);
                    slidebar_result.css({
                        'color': 'green'
                    });
                    slidebar_result.html(scope.percent + '%' + '<div class="test-coverage" style="color:#000">code covered</div>');

                };

            }

        };
    }
]);
