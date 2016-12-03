 var main = angular.module('myApp', []);
        main.controller('formCtrl', ['$scope', '$http', function ($scope, $http) {
        	$scope.showMe = false;
        	$scope.mySwitch = true;
        	
        	$scope.newtweet = function($params) {
		$http.post('/newtweet',{'tweet':$params.tweet})
		.success(function(data, status) {
			$scope.frm.tweet = "";
			console.log("Success");
    })
        };
        $scope.logout = function($params) {
            
        	console.log("In logout");
            $http.post('/logout')
    		.success(function(data, status) {
    			console.log("logged out");
        });
            };
        
            $http.get('/getsessiondata')
            .success(function(data) {
        			$scope.sessioninfo = data;
        			userinfo();
        			gettweeets();
        			followers();
        			following();
        			totaltweets();
        		});
                
    function userinfo()  {
    $http.post('/userinfo',{'data':$scope.sessioninfo.username})
    .success(function(data) {
			$scope.fullname = data.fullname;
			$scope.username = data.username;
		})
		.error(function(err) {
			console.log(err);
		})
            };
            function gettweeets()  {
		$http.post('/gettweets',{'data':$scope.sessioninfo.username})
    .success(function(data) {
			$scope.tweets = data;
		})
            };
            $scope.myFunc = function() {
            	var a;
            	$http.post('/suggestion',{'data':$scope.search})
        		.success(function(data, status) {
        			$scope.suggestion = data;
        			console.log(data);
        			a=data;
        			$http.post('/iffollow',{'search':a})
            		.success(function(data, status) {
            			$scope.search = a;
            			//$scope.mySwitch = false;
                });
            });
                $scope.showMe = !$scope.showMe;
            };
            $scope.follow_user = function() {
            	$http.post('/startfollowing',{'data':$scope.search})
        		.success(function(data, status) {
        			$scope.showMe = !$scope.showMe;	
            }); 
            };
            function followers()  {
        		$http.post('/followers',{'data':$scope.sessioninfo.username})
            .success(function(data) {
        			$scope.followers = data;
        		})
                    };
                function following()  {
                	$http.post('/following',{'data':$scope.sessioninfo.username})
                	.success(function(data) {
        			$scope.following = data;
        		})
                    };
            function totaltweets()  {
		$http.post('/totaltweets',{'data':$scope.sessioninfo.username})
    .success(function(data) {
			$scope.totaltweets = data;
		})
		};
        }])