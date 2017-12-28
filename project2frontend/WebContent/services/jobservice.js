/**
 * 
 */
app.factory('JobService',function($http){

	var BASE_URL="http://localhost:8081/project2middleware"
	var jobService={}
	
	
	jobService.addJob=function(job){
		return $http.post(BASE_URL + "/savejob",job);
	}
	
	
	jobService.getAllJobs=function()
	{
		return $http.get(BASE_URL + "/alljobs")
	}
	
	jobService.getJob=function(jobId)
	{
		return $http.get(BASE_URL + "/gejob/"+jobId)
	}
	return jobService;
})