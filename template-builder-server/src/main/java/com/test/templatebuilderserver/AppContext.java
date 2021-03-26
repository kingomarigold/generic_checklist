package com.test.templatebuilderserver;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@PropertySource("classpath:application.yml")
@EnableTransactionManagement
@ComponentScan({"com.test"})
public class AppContext {
	 @Autowired
	    private Environment environment;

	    @Bean
	    public LocalSessionFactoryBean sessionFactory() {
	        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
	        sessionFactory.setDataSource(dataSource());
	        sessionFactory.setPackagesToScan(new String[] {
	            "com.test"
	        });
	        sessionFactory.setHibernateProperties(hibernateProperties());
	        System.out.println(sessionFactory);
	        return sessionFactory;
	    }

	    @Bean
	    public DataSource dataSource() {
		    
	        DriverManagerDataSource dataSource = new DriverManagerDataSource();
	        dataSource.setDriverClassName(environment.getRequiredProperty("driver-class-name"));
	        dataSource.setUrl(environment.getRequiredProperty("url"));
	        dataSource.setUsername(environment.getRequiredProperty("username"));
	        dataSource.setPassword(environment.getRequiredProperty("password"));
	        
	        System.out.println(environment.getRequiredProperty("url"));
		     
	        System.out.println(environment.getRequiredProperty("username")+"*");
	        System.out.println(environment.getRequiredProperty("password")+"**");
			    
	     
	        return dataSource;
	    }
	    /*
	    @Bean
	    public BCryptPasswordEncoder bCryptPasswordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
		*/
	    private Properties hibernateProperties() {
	        Properties properties = new Properties();
	        properties.put("hibernate.dialect", environment.getRequiredProperty("dialect"));
	        properties.put("hibernate.show_sql", environment.getRequiredProperty("show_sql"));
	        properties.put("hibernate.format_sql", environment.getRequiredProperty("format_sql"));
	        properties.put("hibernate.hbm2ddl.auto", environment.getRequiredProperty("ddl-auto"));
	        return properties;
	    }

	    @Bean
	    public HibernateTransactionManager getTransactionManager() {
	 	    
	        HibernateTransactionManager transactionManager = new HibernateTransactionManager();
	        transactionManager.setSessionFactory(sessionFactory().getObject());
	        return transactionManager;
	    }

}
