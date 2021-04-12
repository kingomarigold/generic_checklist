package com.test.templatebuilderserver.dto;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor	
public class ClinicTemplate {

	private Long id;

	private String name;

	private String template;

	private String description;

	private String clinic;
	private String status;
	private String category;
	private String frequency;

	private String createdDateTime;
	private String updatedDateTime;
	private String dueDateTime;

	public ClinicTemplate(String name, String template, String description, String clinic, String status, String category,
			String createdDateTime, String updatedDateTime, String dueDateTime, String frequency) {
		super();
		this.name = name;
		this.template = template;
		this.description = description;
		this.clinic = clinic;
		this.status = status;
		this.category = category;

		this.createdDateTime = createdDateTime;
		this.updatedDateTime = updatedDateTime;

		this.dueDateTime = dueDateTime;
		this.frequency = frequency;
	}
}
