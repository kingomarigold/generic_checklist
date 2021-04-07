package com.test.templatebuilderserver.web.resource;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.test.templatebuilderserver.config.TokenProvider;
import com.test.templatebuilderserver.dto.LoginDTO;
import com.test.templatebuilderserver.util.TokenFetcher;

@RestController
@RequestMapping("/")
public class LoginController {

	@Autowired
	TokenProvider tokenProvider;

	@Autowired
	AuthenticationManagerBuilder authenticationManagerBuilder;

	@PostMapping(value = "login")
	@CrossOrigin
	public ResponseEntity<AuthResponse> login(@Validated @RequestBody LoginDTO credentials) {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				credentials.getUsername(), credentials.getPassword());

		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		boolean rememberMe = (credentials.isRememberMe() == null) ? false : credentials.isRememberMe();
		String jwt = tokenProvider.createToken(authentication, rememberMe);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(TokenFetcher.AUTHORIZATION_HEADER, "Bearer " + jwt);
		String roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		return new ResponseEntity<>(new AuthResponse(jwt, roles), httpHeaders, HttpStatus.OK);
	}
	
	@PostMapping(value = "token")
	@CrossOrigin
	public ResponseEntity<?> generate(HttpServletRequest request) {
		String authToken = TokenFetcher.resolveToken(request);
		String newToken = tokenProvider.refreshToken(authToken);
		Map<String,String> retVal = new HashMap<String,String>();
		retVal.put("token", newToken);
		return newToken != null? new ResponseEntity<>(retVal, HttpStatus.OK): ResponseEntity.status(HttpStatus.FORBIDDEN).build();

	}

	static class AuthResponse {
		private String idToken;
		private String authorities;

		AuthResponse(String idToken, String authorities) {
			this.idToken = idToken;
			this.authorities = authorities;
		}

		@JsonProperty("id_token")
		String getIdToken() {
			return idToken;
		}
		
		@JsonProperty("roles")
		String getAuthorities() {
			return authorities;
		}

	}
}