package com.test.templatebuilderserver.web.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ClinicResource {
	@GetMapping("/clinics")
	public ResponseEntity getAll() {
		return null;
		
	}
}
