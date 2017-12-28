/**
 * 
 */

app.controller('BlogPostController',function($scope,BlogService,$location,$rootScope){
	$scope.saveBlog=function(){
		BlogService.saveBlog($scope.blog).then(function(response){
			alert('BlogPost added sucessfully and it is waited for approval')
			$location.path('/home')
		},function(response){
			if(response.status==401)
				{
				$location.path('/login')
				}
			if(response.status==500)
				{
				$scope.error=response.data
				}
		})
	}
	
	BlogService.getBlogsApproved.then(function(response){
		$scope.blogsApproved=response.data
	},function(response){
		if(response.status==401)
			$location.path('/login')
			
	})
	
	if($rootScope.currentUser.role=='ADMIN'){
	BlogService.getBlogsWaitingForApproval().then(function(response){
		$scope.blogsWaitingForApproval=response.data
	},function(response){
		if(response.status==401)
			{
			if(response.data==5)
				$location.path('/login')
				else
				{
					alert(response.data.message)
					$location.path('/home')
				}
			}
	})
	}
	
})