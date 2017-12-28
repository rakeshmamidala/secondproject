/**
 * 
 */

app.controller('BlogPostDetailsController',function($scope,$location,$routeParams,BlogService){
	var id=$routeParams.id
	$scope.isRejected=false;
	
	BlogService.getBlogPost(id).then(function(response){
		$scope.blogPost=response.data
	},function(response){
		if(response.status==401)
			{
			$location.path('/login')
			}
	})
	
	BLogService.userLikes(id).then(function(response){
		if(response.data=='')
			$scope.liked=false
		else
			$scope.liked=true 
		alert($scope.liked)	
		
	},function(response){
		if(response.status==401)
		{
		$location.path('/login')
		}
	})
	
	$scope.showRejectionTxt=function(val)
	{
		$scope.isRejected=val
	}
	
	
	$scope.updateBlogPost=function()
	{
		BlogService.updateBlogPost($scope.blogPost,$scope.rejectionReason).then(function(response){
					$location.path('/getblogs')
				},function(respopnse){
					if(response.status==401){
						$location.path('/login')
					}
					if(response.status==500){
						alert(response.data)
						$scope.error=response.data
					}
					
				})
	}
})

	$scope.updateLikes=function()
	{
		BlogService.updateLikes($scope.blogPost).then(function(response){
			$scope.blogPost=response.data;
			$scope.liked=!$scope.liked;
			
		},function(response){
			if(response.status==401){
				$location.path('/login')
			}
		})

	}