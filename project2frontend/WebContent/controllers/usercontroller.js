/**
 * usercontroller
 */

app.controller('UserController',function($scope,UserService,$location,$rootScope,$cookieStore){
	
	$scope.registerUser=function(){
		console.log($scope.user)
		
	 UserService.registerUser($scope.user)
	 .then(function(response){
		 $location.path('/login')
	 },function(response){
		 console.log(response.data)
		 console.log(response.status)
		 $scope.error=response.data
		 })
	 }
	
	$scope.login=function(){
		UserService.login($scope.user)
		.then(function(response){
			$rootScope.currentUser=response.data
			$cookieStore.put('currentUser',response.data  )
			$location.path('/home')
		},function(response){
			if(response.status==401){
				$scope.error=response.data
				$location.path('/login')
			}
			
		})
	}
	
	//only for edit,this statement will be executed and it will not executed for registration
	if($rootScope.currentUser!=undefined){
		UserService.getUser().then(function(response){
			
			$scope.user=response.data
			
		},function(response){
			
			if(response.status==401){
				$location.path('/login')
			}
		
		})
	}
	
	$scope.editUserProfile=function(){
		UserService.editUserProfile($scope.user).then(function(response){
			
			alert('updated sucessfully')
			$location.path('/home')
			
		},function(response){
			if(response.status==401)
				$location.path('/login')
			if(response.status==500){
				$scope.error=response.data
				$location.path('/editprofile')
			}
		})
	}
})