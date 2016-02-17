var app=angular.module('myApp',[])
app.controller('myCtrl', ['$scope','$http', function($scope,$http){
	$scope.firstname="zan";
	$scope.tipok=false;
	$scope.tiperror=false;
	$scope.infolist = {
		sender:'',
		title:'',
		summary:''
	}
	$scope.user={
		name:'',
		psd:''
	}
	$scope.getData=function(){
		$http({
		url:'myjson',
		method:'GET'
	}).success(function(data){
		$scope.data=data;
	}).error(function(data){
		console.error('something wrong');
	});
	}
	$scope.submit = function(){
		$http({
			url:'/addshop',
			method:'POST',
			data:{
				'sender':$scope.infolist.sender,
				'title':$scope.infolist.title,
				'summary':$scope.infolist.summary
			}
		}).success(function(data){
			$scope.tipok=true;
			$scope.getData();
		}).error(function(data){
			console.error('something wrong');
			$scope.tiperror=true;
		});
	}
	$scope.reset = function(){
		$scope.infolist = {
		sender:'',
		title:'',
		summary:''
	}
	}
	$scope.register = function(){
		$http({
			url:'/adduser',
			method:'POST',
			data:{
				'name':$scope.user.name,
				'psd':$scope.user.psd
			}
		}).success(function(data){
			$scope.tipokregister=true;
			$scope.getData();
		}).error(function(data){
			console.error('something wrong');
			$scope.tiperrorregister=true;
		});
	}
	$scope.getData();
}])