package com.test.templatebuilderserver.web.resource;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.templatebuilderserver.dto.Template;
import com.test.templatebuilderserver.service.TemplateService;

@RestController
@RequestMapping("/api")
public class TemplateResource {

	@Autowired
	TemplateService templateService;

	@PostMapping("/template")
	@CrossOrigin
	public ResponseEntity save(@RequestBody @Validated Template template) {
		try {
			return ResponseEntity.created(new URI("/api/template/" + templateService.save(template))).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/template/{id}")
	@CrossOrigin
	public ResponseEntity<Template> get(@PathVariable Long id) {
		Template data = templateService.get(id);
		if (data != null) {
			return ResponseEntity.ok(data);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/templates")
	@CrossOrigin
	public ResponseEntity getAll() {
		return ResponseEntity.ok(templateService.getAll());
	}
}
