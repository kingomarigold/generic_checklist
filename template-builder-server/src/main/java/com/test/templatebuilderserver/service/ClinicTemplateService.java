package com.test.templatebuilderserver.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.templatebuilderserver.dto.ClinicTemplate;
import com.test.templatebuilderserver.dto.Template;
import com.test.templatebuilderserver.repository.ClinicTemplateRepository;
import com.test.templatebuilderserver.util.ClobToStringConvertUtility;
import com.test.templatebuilderserver.util.DateUtil;

@Service
public class ClinicTemplateService {
	@Autowired
	ClinicTemplateRepository clinicTemplateRepository;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

	@Transactional
	public Long save(String clinicId, ClinicTemplate template) {
		LocalDate date = LocalDate.now();
		LocalDate dueDate = DateUtil.getDueDate(template.getFrequency(), date);
		return clinicTemplateRepository.save(new com.test.templatebuilderserver.entity.ClinicTemplate(clinicId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), date, date, dueDate)).getId();
	}
	
	public void createTemplate(String[] clinics, Template template) {
		
	}

	

	public ClinicTemplate get(Long id) {
		ClinicTemplate retVal = null;
		Optional<com.test.templatebuilderserver.entity.ClinicTemplate> template = clinicTemplateRepository.findById(id);
		if (template.isPresent()) {
			retVal = new ClinicTemplate(template.get().getId(), template.get().getName(),
					ClobToStringConvertUtility.clobToString(template.get().getData()), template.get().getDescription(),
					template.get().getClinic(), template.get().getStatus(), template.get().getCategory(),
					template.get().getCreatedDate().format(formatter),
					template.get().getUpdatedDate().format(formatter), (template.get().getDueDate() != null
							? template.get().getDueDate().format(formatter) : null),
					"");
		}
		return retVal;
	}

	public List getAll(String userId) {
		return convertToDtos(clinicTemplateRepository.getAll(userId));
	}

	String getStatusColor(String status) {
		String color = "primary";
		if (status.equals("done")) {
			color = "textPrimary";
		} else if (status.equals("inprogress")) {
			color = "secondary";
		}
		return color;
	}

	public ClinicTemplate update(Long id, String userId, ClinicTemplate template, ClinicTemplate existingData) {
		LocalDate date = LocalDate.now();
		System.out.println("Date time " + date);
		LocalDate createdDateTime = LocalDate.parse(existingData.getCreatedDateTime(), formatter);

		LocalDate dueDateTime = LocalDate.parse(existingData.getDueDateTime(), formatter);
		/*
		 * if (existingData.getDueDateTime() != null) { dueDateTime =
		 * LocalDateTime.parse(existingData.getDueDateTime(), formatter); } else
		 * { dueDateTime = getDueDate(template.getFrequency(),
		 * LocalDateTime.parse(existingData.getCreatedDateTime(), formatter)); }
		 */

		if (date.isAfter(dueDateTime)) {
			dueDateTime = DateUtil.getDueDate(template.getFrequency(), date);
		}
		clinicTemplateRepository.save(new com.test.templatebuilderserver.entity.ClinicTemplate(id, userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), createdDateTime, date, dueDateTime));
		return template;
	}

	private List convertToDtos(List<com.test.templatebuilderserver.entity.ClinicTemplate> list) {

		List retVal = new ArrayList();
		list.forEach(template -> retVal.add(new ClinicTemplate(template.getId(), template.getName(),
				ClobToStringConvertUtility.clobToString(template.getData()), template.getDescription(),
				template.getClinic(), template.getStatus(), template.getCategory(),
				template.getCreatedDate().format(formatter), template.getUpdatedDate().format(formatter),
				(template.getDueDate() != null ? template.getDueDate().format(formatter) : null), "")));
		return retVal;
	}
}
