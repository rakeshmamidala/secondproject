package com.niit.configuration;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;


import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.niit.model.BlogPost;
import com.niit.model.BlogPostLikes;
import com.niit.model.Job;
import com.niit.model.Notification;
import com.niit.model.User;



@Configuration
@EnableTransactionManagement
public class DBConfiguration
{
  @Bean
  public SessionFactory sessionFactory()
  {
	  LocalSessionFactoryBuilder lsf = new LocalSessionFactoryBuilder(getDataSource());
	  
	  Properties hibernateProperties = new Properties();
  
	  hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.Oracle10gDialect");
  
	  hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "update");
	  
	  hibernateProperties.setProperty("hibernate.show_sql", "true");
	  
	  lsf.addProperties(hibernateProperties);
	  
	  Class classes[] =new Class[]{User.class,Job.class,BlogPost.class,Notification.class,BlogPostLikes.class};
	  
	  return lsf.addAnnotatedClasses(classes).buildSessionFactory();
  }
  
  @Bean
	public DataSource getDataSource() {
		
		BasicDataSource dataSource = new BasicDataSource();
		
		// Providing the database connection information
		dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
		dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
		dataSource.setUsername("system");
		dataSource.setPassword("sys");
						
		return dataSource;
		
	}
	
	@Bean
	public HibernateTransactionManager hibTransManagement()
	{
		return new HibernateTransactionManager(sessionFactory());
		
	}
	
	
}