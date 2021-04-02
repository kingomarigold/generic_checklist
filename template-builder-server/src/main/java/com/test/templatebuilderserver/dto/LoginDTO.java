package com.test.templatebuilderserver.dto;

import org.springframework.lang.NonNull;

import com.sun.istack.NotNull;

public class LoginDTO {

	@NonNull
	private String username;

	@NotNull
	private String password;

	private Boolean rememberMe;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean isRememberMe() {
		return rememberMe;
	}

	public void setRememberMe(Boolean rememberMe) {
		this.rememberMe = rememberMe;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "LoginVM{" + "username='" + username + '\'' + ", rememberMe=" + rememberMe + '}';
	}
}