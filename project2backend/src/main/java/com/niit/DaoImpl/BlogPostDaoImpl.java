package com.niit.DaoImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.Dao.BlogPostDao;
import com.niit.model.BlogComment;
import com.niit.model.BlogPost;
import com.niit.model.Notification;

@Repository
@Transactional
public class BlogPostDaoImpl implements BlogPostDao 
{
	@Autowired 
	private SessionFactory sessionFactory;
	public void saveBlogPost(BlogPost blogPost)
	{
		Session session=sessionFactory.getCurrentSession();
		session.save(blogPost);
		
	}
	public List<BlogPost> getBlogs(int approved)
	{
		Session session=sessionFactory.getCurrentSession();
		Query query=session.createQuery("from BlogPost where approved="+ approved);
		return query.list();
	}
	
	public BlogPost getBlogById(int id) 
	{
		Session session=sessionFactory.getCurrentSession();
		BlogPost blogPost=(BlogPost)session.get(BlogPost.class, id);
		return blogPost;
	}
	
	public void updateBlogPost(BlogPost blogPost,String rejectionReason)
	{
		Session session=sessionFactory.getCurrentSession();
		Notification notification=new Notification();
		notification.setBlogTitle(blogPost.getBlogTitle());
		notification.setUsername(blogPost.getPostedBy().getUsername());
	   if(blogPost.isApproved())
       {
    	   session.update(blogPost);
    	   notification.setApprovalStatus("Approved");
    	   session.save(notification);
       }
	   else
	   {
		   if(rejectionReason=="")
		   {
			   notification.setRejectionReason("Not Mentioned By Admin");
		   }
		   else
		   notification.setRejectionReason(rejectionReason);
		   notification.setApprovalStatus("Rejected");
		   session.save(notification);
		   session.delete(blogPost);
	   }
	}
	
	
	public void addComment(BlogComment blogComment) 
	{
		Session session=sessionFactory.getCurrentSession();
		session.save(blogComment);
		
	}

}
