/**
 * 
 */

app.factory('BlogService',function($http){
	var blogService={}
	var BASE_URL="http://localhost:8081/project2middleware"
		
		blogService.saveBlog=function(blog)
		{
			return $http.post(BASE_URL + "/saveblog",blog)
	    }
	
	   blogService.getBlogsApproved=function()
	   {
			return $http.get(BASE_URL + "/getblogs/"+1)
	   }
	   
	   blogService.getBlogsWaitingForApproval=function()
	   {
			return $http.get(BASE_URL + "/getblogs/"+0)
	   }
	   
	   blogService.getBlogPost=function(id)
	   {
		   return $http.get(BASE_URL + "/getblog/"+id)
	   }
	   
	   blogService.updateBlogPost=function(blogPost,rejectionReason)
	   {
		   if(rejectionReason==undefined)
		   return $http.put(BASE_URL + "/updateapprovalstatus?rejectionReason="+'Not Mentioned',blogPost)
		   else
			   return $http.put(BASE_URL + "/updateapprovalstatus?rejectionReason="+rejectionReason,blogPost)
	   }
	   
	   blogService.userLikes=function(id)
	   {
		   return $http.get(BASE_URL + "/userLikes/"+id)
	   }
	   
	   blogService.updateLikes=function(blogPost)
	   {
		   return $http.put(BASE_URL + "/updatelikes",blogPost);
	   }
	return blogService;
})