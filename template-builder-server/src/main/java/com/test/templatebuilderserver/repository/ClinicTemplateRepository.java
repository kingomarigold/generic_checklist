package com.test.templatebuilderserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.test.templatebuilderserver.entity.ClinicTemplate;

public interface ClinicTemplateRepository extends JpaRepository<ClinicTemplate, Long> {

	@Query("select t from ClinicTemplate t where t.clinic = :clinic and t.status='In Progress' order by t.updatedDate desc")
	List<com.test.templatebuilderserver.entity.ClinicTemplate> getAll(@Param("clinic") String clinic);
	

	@Query("select t.status, count(*) as total from ClinicTemplate t where t.clinic = :clinic group by t.status")
	List getDashboardCount(@Param("clinic") String clinic);
	
}
