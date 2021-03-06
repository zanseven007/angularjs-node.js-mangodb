var app=angular.module('myApp',[])
app.controller('myCtrl', ['$scope','$http', function($scope,$http){
	$scope.firstname="zan";
	$scope.tipok=false;
	$scope.tiperror=false;
	$scope.loginIf = false;
	$scope.searchStr = '';
	$scope.newPsw = '';
	$scope.infolist = {
		sender:'',
		title:'',
		img:'',
		phone:'',
		summary:''
	}
	$scope.register = {
		nameblur:false,
		nameblurbox:false,
		nameblurboxnull:false,
		psdblur:false,
		psdblurbox:false,
		psdblurboxnull:false,
		academyblurbox:false,

	}
	$scope.classifyStr='';
	$scope.selectedR = '';
	$scope.selectedC = '';

	$scope.modelR = [{
	    id: 1,
	    academyName: '计算机学院',
	}, {
	    id: 2,
	    academyName: '机械学院',
	}, {
	    id: 3,
	    academyName: '电气学院',
	}, {
	    id: 4,
	    academyName: '体育学院',
	}];
	$scope.modelC = [{
	    id: 1,
	    classify: '闲置数码',
	}, {
	    id: 2,
	    classify: '闲置书籍',
	}, {
	    id: 3,
	    classify: '闲置服饰',
	}, {
	    id: 4,
	    classify: '其他',
	}];
	$scope.user={
		name:'',
		psd:'',
		psdConfirm:'',
		academy:''
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
				'sender':window.localStorage.isLoginName,
				'title':$scope.infolist.title,
				'classify':$scope.selectedC.classify,
				'phone':$scope.infolist.phone,
				'img':$scope.infolist.img,
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
	$scope.changePsw = function(){
		$http({
			url:'/addshop',
			method:'POST',
			data:{
				'name':window.localStorage.isLoginName
			}
		}).success(function(data){
			alert('修改成功');
		}).error(function(data){
			console.error('something wrong');
		});
	}

	$scope.reset = function(){
		$scope.infolist = {
			sender:'',
			title:'',
			img:'',
			phone:'',
			summary:''
		}
		$scope.selectedC = '';
		$scope.tipok=false;

	}

	//登录
	$scope.mylogin = {
		loginName:'',
		psd:'',
	}
	$scope.isLogin = window.localStorage.isLogin || '';
	$scope.isLoginName = window.localStorage.isLoginName || '';
	$scope.mylogin = function(){
		$http({
			url:'/login',
			method:'POST',
			data:{
				'name':$scope.mylogin.loginName,
				'psd':$scope.mylogin.psd,
			}
		}).success(function(data){
			if(data.status == 1){
				$('#login').modal('hide');
				$scope.isLogin = '1';
				window.localStorage.isLogin = '1';
				$scope.isLoginName = data.name;
				window.localStorage.isLoginName = data.name;
				window.localStorage.isLoginPsw = $scope.mylogin.psd;
			}else if(data.status == 2){
				alert('用户名不存在！');
			}else if(data.status ==3){
				alert('密码错误！');
			}else{
				alert('发生了一点意外');
			}
		}).error(function(data){
			console.error('something wrong');
		});
	}
	$scope.myreset = function(){
		$http({
			url:'/myreset',
			method:'POST',
			data:{
				'name':window.localStorage.isLoginName,
				'newPsw':$scope.newPsw,
			}
		}).success(function(data){
			if(data.status == 1){
				alert('修改成功')
			}else{
				alert('发生了一点意外');
			}
		}).error(function(data){
			console.error('something wrong');
		});
	}
	//退出
	$scope.exit = function(){
		$scope.isLogin = null;
		window.localStorage.removeItem('isLogin');
		$scope.isLoginName = null;
		window.localStorage.removeItem('isLoginName');
		window.localStorage.removeItem('isLoginPsw');
	}
	//注册
	$scope.register = function(){
		if(!$scope.selectedR.academyName){
			$scope.register.academyblur = true;
			return false;	
		}
		$http({
			url:'/adduser',
			method:'POST',
			data:{
				'name':$scope.user.name,
				'psd':$scope.user.psd,
				'academy':$scope.selectedR.academyName,
			}
		}).success(function(data){
			$('#register').modal('hide');
		}).error(function(data){
			console.error('something wrong');
			$scope.tiperrorregister=true;
		});
	}
	$scope.nameBlur = function(){
		if($scope.user.name == ''){
			$scope.register.nameblurboxnull = true;
			$scope.register.nameblur = false;

			return false;
		}else{
			$scope.register.nameblurboxnull = false;
			$scope.register.nameblur = true;
		}
		$http({
			url:'/selectuser',
			method:'POST',
			data:{
				'name':$scope.user.name,
				}
		}).success(function(data){
			if(data.status == 1){
				$scope.register.nameblur = true;
				$scope.register.nameblurbox = false;
			}else if(data.status == 2){
				$scope.register.nameblur = false;
				$scope.register.nameblurbox = true;
			}
		}).error(function(data){
			console.error('something wrong');
			$scope.tiperrorregister=true;
		});
	}
	$scope.psdBlur = function(){
		if($scope.user.psdConfirm == '' || $scope.user.psd==''){
			$scope.register.psdblurboxnull = true;
			$scope.register.psdblur = false;
			return false;
		}else{
			$scope.register.psdblurboxnull = false;
			$scope.register.psdblur = true;
		}
		if($scope.user.psdConfirm != $scope.user.psd)
		{
			$scope.register.psdblur = false;
			$scope.register.psdblurbox = true;

		}else{
			$scope.register.psdblur = true;
			$scope.register.psdblurbox = false;

		}
	}
	$scope.search = function(str){
		$http({
			url:'/classify',
			method:'POST',
			data:{
				'classify':str,
			}
		}).success(function(data){
			$scope.data=data;
		}).error(function(data){
			console.error('something wrong');
		});
	}
	$scope.searchClick = function(){
		$http({
			url:'/title',
			method:'POST',
			data:{
				'title':$scope.searchStr,
			}
		}).success(function(data){
			$scope.data=data;

		}).error(function(data){
			console.error('something wrong');
		});
	}
	$scope.getData();

}])
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);