package com.niit.Dao;

import java.util.List;

import com.niit.model.BlogPost;

public interface BlogPostDao
{
	void saveBlogPost(BlogPost blogPost);

	List<BlogPost> getBlogs(int approved);
	
	BlogPost getBlogById(int id);
	
	void updateBlogPost(BlogPost blogPost,String rejectionReason);
	
	 
	
}
