package com.test.templatebuilderserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.test.templatebuilderserver.entity.Template;

public interface TemplateRepository extends JpaRepository<Template, Long> {

	@Query("select new com.test.templatebuilderserver.dto.Template(t.id, t.name) from Template t")
	List<com.test.templatebuilderserver.dto.Template> getAll();
}
