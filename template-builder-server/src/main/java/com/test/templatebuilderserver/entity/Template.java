
package com.test.templatebuilderserver.entity;

import java.sql.Clob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "template")
public class Template {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	private String name;


	private String clinic;

	private String frequency;

	private String category;
	
	@Lob
    private Clob data;
	
	@Column(name="description")
	private String description;

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

	public Template() {
		super();
	}

	public Template( String name, String clinic, String description,String category,  String frequency, Clob data
			) {
		super();
		this.name = name;
		this.clinic = clinic;
		this.frequency = frequency;
		this.category = category;
		this.data = data;
		this.description = description;
	}
	
	public Template(Long id,String name, String clinic, String description,  String category, String frequency, Clob data) {
		super();
		this.id = id;
		this.name = name;
		this.clinic = clinic;
		this.frequency = frequency;
		this.category = category;
		this.data = data;
		this.description = description;
	}

	public Template(Long id, String name, Clob type, String description) {
		super();
		this.id = id;
		this.name = name;
		this.data = type;
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Clob getData() {
		return data;
	}

	public void setData(Clob data) {
		this.data = data;
	}

	public String getClinic() {
		return clinic;
	}

	public void setClinic(String clinic) {
		this.clinic = clinic;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
}
