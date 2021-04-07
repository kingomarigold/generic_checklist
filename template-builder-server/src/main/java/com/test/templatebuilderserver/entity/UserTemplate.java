package com.test.templatebuilderserver.entity;

import java.sql.Clob;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "user_template")
public class UserTemplate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	private String userId;

	private String name;

	@Column(name = "description")
	private String description;

	@Lob
	private Clob data;

	private String status;

	private String category;

	private LocalDateTime createdDateTime;

	private LocalDateTime updatedDateTime;

	public UserTemplate(String userId, String name, String description, Clob data, String status, String category,
			LocalDateTime createdDateTime, LocalDateTime updatedDateTime) {
		this.userId = userId;
		this.name = name;
		this.description = description;
		this.data = data;
		this.status = status;
		this.category = category;
		this.createdDateTime = createdDateTime;
		this.updatedDateTime = updatedDateTime;
	}

	public UserTemplate(Long id, String userId, String name, String description, Clob data, String status,
			String category, LocalDateTime createdDateTime, LocalDateTime updatedDateTime) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.description = description;
		this.data = data;
		this.status = status;
		this.category = category;
		this.createdDateTime = createdDateTime;
		this.updatedDateTime = updatedDateTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserTemplate() {
		super();
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Clob getData() {
		return data;
	}

	public void setData(Clob data) {
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public LocalDateTime getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(LocalDateTime createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public LocalDateTime getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(LocalDateTime updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
}
