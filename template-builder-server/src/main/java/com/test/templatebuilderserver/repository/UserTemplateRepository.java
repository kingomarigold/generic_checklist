package com.test.templatebuilderserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.test.templatebuilderserver.entity.UserTemplate;

public interface UserTemplateRepository extends JpaRepository<UserTemplate, Long> {

	@Query("select t from UserTemplate t where t.userId = :userId and t.status='inprogress' order by t.updatedDateTime desc")
	List<com.test.templatebuilderserver.entity.UserTemplate> getAll(@Param("userId") String userId);
}
