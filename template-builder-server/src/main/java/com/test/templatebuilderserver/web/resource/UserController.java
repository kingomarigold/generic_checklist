package com.test.templatebuilderserver.web.resource;



import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.templatebuilderserver.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/user")
public class UserController {

	@PostMapping(value = "/user")
	@CrossOrigin
	public User login( @RequestParam("name") String username, @RequestParam("password") String pwd) {
		System.out.println("Security post");
		String token = getJWTToken(username);
		User user = new User(username,pwd);
		//user.setName(username);
		user.setToken(token);	
		System.out.println(user.token+"Security token"+token);
		return user;
		
	}

	private String getJWTToken(String username) {
		String secretKey = "!@#$%^&*()QWERTYUIOP1234567890asdfghjkl";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList("USER");
		System.out.println("Security post 22");
		
		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS256,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}
}