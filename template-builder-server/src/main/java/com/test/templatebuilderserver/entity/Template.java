
package com.test.templatebuilderserver.entity;

import java.sql.Clob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor	
public class Template {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	private String name;

	private String clinics;

	private String frequency;

	private String category;
	
	@Lob
    private Clob data;
	
	@Column(name="description")
	private String description;

	public Template( String name, String clinics, String description,String category,  String frequency, Clob data
			) {
		super();
		this.name = name;
		this.clinics = clinics;
		this.frequency = frequency;
		this.category = category;
		this.data = data;
		this.description = description;
	}
	
	public Template(Long id,String name, String clinics, String description,  String category, String frequency, Clob data) {
		super();
		this.id = id;
		this.name = name;
		this.clinics = clinics;
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
}
