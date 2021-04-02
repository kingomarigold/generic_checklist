
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

	public Template(String name, Clob type, String description) {
		super();
		this.name = name;
		this.data = type;
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
}
