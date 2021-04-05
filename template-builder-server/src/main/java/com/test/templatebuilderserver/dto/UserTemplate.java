package com.test.templatebuilderserver.dto;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserTemplate {

	public UserTemplate() {
		super();
	}

	private Long id;

	private String name;

	private String template;

	private String description;

	private String userId;
	private String status;

	public UserTemplate(String name, String template, String description, String userId, String status) {
		super();
		this.name = name;
		this.template = template;
		this.description = description;
		this.userId = userId;
		this.status = status;
	}

	public UserTemplate(Long id, String name, String template, String description, String userId, String status) {
		super();
		this.id = id;
		this.name = name;
		this.template = template;
		this.description = description;
		this.userId = userId;
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(@NonNull String name) {
		this.name = name;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(@NonNull String template) {
		this.template = template;
	}

	public String toJSON() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		return new String(mapper.writeValueAsBytes(this));
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
