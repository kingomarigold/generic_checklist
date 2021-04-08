package com.test.templatebuilderserver.web.resource;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.templatebuilderserver.dto.Dashboard;
import com.test.templatebuilderserver.dto.Template;
import com.test.templatebuilderserver.dto.UserTemplate;
import com.test.templatebuilderserver.service.TemplateService;
import com.test.templatebuilderserver.service.UserTemplateService;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserTemplateResource {

	@Autowired
	UserTemplateService userTemplateService;

	@Autowired
	TemplateService templateService;

	@PostMapping("/{id}/template")
	ResponseEntity save(@PathVariable("id") String id, @RequestBody UserTemplate template) {
		try {
			return ResponseEntity
					.created(new URI("/api/user/" + id + "/template/" + userTemplateService.save(id, template)))
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{id}/template/{templateId}")
	public ResponseEntity<UserTemplate> get(@PathVariable("id") String userId,
			@PathVariable("templateId") Long templateId) {
		UserTemplate data = userTemplateService.get(templateId);
		if (data != null) {
			return ResponseEntity.ok(data);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}/templates")
	public ResponseEntity getAll(@PathVariable("id") String userId) {
		Map<String, Object> templatesMap = new LinkedHashMap<String, Object>();

		List<UserTemplate> tempaltes = userTemplateService.getAll(userId);
		System.out.println("User tempaltes list :" + tempaltes.size());
		for (UserTemplate template : tempaltes) {
			templatesMap.put(template.getName(), template);
		}
		List<Template> defaultTempaltes = templateService.getAll();
		System.out.println("Default tempaltes list :" + defaultTempaltes.size());
		for (Template template : defaultTempaltes) {
			if (!templatesMap.containsKey(template.getName())) {
				templatesMap.put(template.getName(), template);
			}
		}
		return ResponseEntity.ok(templatesMap.values());
	}

	@PutMapping("/{id}/template/{templateId}")
	public ResponseEntity<UserTemplate> update(@PathVariable("id") String userId,
			@PathVariable("templateId") Long templateId, @RequestBody @Validated UserTemplate template) {
		UserTemplate data = userTemplateService.get(templateId);
		if (data != null) {
			return ResponseEntity.ok(userTemplateService.update(templateId, userId, template, data));
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}/dashboards")
	public ResponseEntity getDashboardCount(@PathVariable("id") String userId) {
		List<Dashboard> tempaltes = userTemplateService.getDashboardCount(userId);
		return ResponseEntity.ok(tempaltes);
	}

}
