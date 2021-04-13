package com.test.templatebuilderserver.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.test.templatebuilderserver.entity.UserTemplate;

public interface UserTemplateRepository extends JpaRepository<UserTemplate, Long> {

	@Query("select t from UserTemplate t where t.userId = :userId and t.status in :statuses order by t.dueDateTime asc")
	List<com.test.templatebuilderserver.entity.UserTemplate> getAll(@Param("userId") String userId, @Param("statuses") String[] statuses);
	

	@Query("select t.status, count(*) as total from UserTemplate t where t.userId = :userId and t.dueDateTime > :currentTime group by t.status")
	List getDashboardCount(@Param("userId") String userId, @Param("currentTime") LocalDateTime currentTime);
	
	@Query("select count(*) as total from UserTemplate t where t.userId = :userId and t.dueDateTime <= :currentTime ")
	Long getOverdueCount(@Param("userId") String userId, @Param("currentTime") LocalDateTime currentTime);

}
