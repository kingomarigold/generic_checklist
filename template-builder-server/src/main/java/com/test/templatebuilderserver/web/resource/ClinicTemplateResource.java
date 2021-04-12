package com.test.templatebuilderserver.web.resource;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.templatebuilderserver.dto.ClinicTemplate;
import com.test.templatebuilderserver.dto.Dashboard;
import com.test.templatebuilderserver.service.ClinicTemplateService;
import com.test.templatebuilderserver.service.TemplateService;

@CrossOrigin
@RestController
@RequestMapping("/api/clinic")
public class ClinicTemplateResource {

	@Autowired
	ClinicTemplateService clinicTemplateService;

	@Autowired
	TemplateService templateService;


	@GetMapping("/{id}/template/{templateId}")
	public ResponseEntity<ClinicTemplate> get(@PathVariable("id") String userId,
			@PathVariable("templateId") Long templateId) {
		ClinicTemplate data = clinicTemplateService.get(templateId);
		if (data != null) {
			return ResponseEntity.ok(data);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}/templates")
	public ResponseEntity getAll(@PathVariable("id") String clinicId) {
		return ResponseEntity.ok(clinicTemplateService.getAll(clinicId));
	}

	@PutMapping("/{id}/template/{templateId}")
	public ResponseEntity<ClinicTemplate> update(@PathVariable("id") String clinicId,
			@PathVariable("templateId") Long templateId, @RequestBody @Validated ClinicTemplate template) {
		ClinicTemplate data = clinicTemplateService.get(templateId);
		if (data != null) {
			return ResponseEntity.ok(clinicTemplateService.update(templateId, clinicId, template, data));
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}/dashboards")
	public ResponseEntity getDashboardCount(@PathVariable("id") String clinicId) {
		//List<Dashboard> tempaltes = clinicTemplateService.getDashboardCount(clinicId);
		return ResponseEntity.ok(new ArrayList<Dashboard>());
	}

}
