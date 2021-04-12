package com.test.templatebuilderserver.entity;

import java.sql.Clob;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "user_template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClinicTemplate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	private String clinic;

	private String name;

	@Column(name = "description")
	private String description;

	@Lob
	private Clob data;

	private String status;

	private String category;

	private LocalDate createdDate;

	private LocalDate updatedDate;
	
	private LocalDate dueDate;

	public ClinicTemplate(String clinic, String name, String description, Clob data, String status, String category,
			LocalDate createdDate, LocalDate updatedDate, LocalDate dueDate) {
		this.clinic = clinic;
		this.name = name;
		this.description = description;
		this.data = data;
		this.status = status;
		this.category = category;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
		this.dueDate = dueDate;
	}
}
