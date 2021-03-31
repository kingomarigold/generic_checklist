package com.test.templatebuilderserver.dto;

public class User {

	public User() {
		super();
	}

	private int id;

	
	private String name;

	private String password;

	private String role;
	private String token;

	public User(String name, String password) {
		super();
		this.name = name;
		this.password = password;
	}
	public User(int id) {
		super();
		this.id = id;
		
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getToken(String token) {
		return token;
	}
	
	
}
