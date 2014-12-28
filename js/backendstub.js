 (function(ng) {

    if(!document.URL.match(/\?nobackend/)) {
         return; 
    }

   
    initializeStubbedBackend();

    function initializeStubbedBackend() {
        
        ng.module('myapp')
        .config(['$provide',function($provide){
           $provide.decorator('$httpBackend',angular.mock.e2e.$httpBackendDecorator); 
        }])
        .run(['$httpBackend',function($httpBackend,$timeout){
           
            $httpBackend.whenGET(/assets* ?/).passThrough();
            var data_object = {};
     

            $httpBackend.whenGET("/data").respond(
                function(method,url,data) {
                       return [200, Math.floor(Math.random() * (100 - 25)) + 25, {}];
                  }
            );

       }]);
    }
})(angular);