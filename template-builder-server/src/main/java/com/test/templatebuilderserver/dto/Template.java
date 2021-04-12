package com.test.templatebuilderserver.dto;

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
public class Template {


	public Template(String name, String clinic, String description, String category, String frequency, String template) {
		super();
		this.name = name;
		this.template = template;
		this.description = description;
		this.clinics = clinic;
		this.frequency = frequency;
		this.category = category;
	}

	public Template(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
		
	}

	private Long id;

	private String name;

	private String template;

	private String description;
	
	private String clinics;

	private String frequency;

	private String category;

	public String toJSON() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		return new String(mapper.writeValueAsBytes(this));
	}
}
