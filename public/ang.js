var app = angular.module('myApp', ['ngRoute', 'controller'])

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home',{
		templateUrl: '/'
	})
	.when('/logout', {
		templateUrl: '/home.html'
	})
});