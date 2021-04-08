package com.test.templatebuilderserver.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.templatebuilderserver.dto.Dashboard;
import com.test.templatebuilderserver.dto.UserTemplate;
import com.test.templatebuilderserver.repository.UserTemplateRepository;
import com.test.templatebuilderserver.util.ClobToStringConvertUtility;

@Service
public class UserTemplateService {
	@Autowired
	UserTemplateRepository userTemplateRepository;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

	@Transactional
	public Long save(String userId, UserTemplate template) {

		LocalDateTime date = LocalDateTime.now();
		LocalDateTime dueDate = getDueDate(template.getFrequency(), date);
		return userTemplateRepository.save(new com.test.templatebuilderserver.entity.UserTemplate(userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), date, date, dueDate)).getId();
	}

	LocalDateTime getDueDate(String frequency, LocalDateTime date) {

		if (frequency.equals("\"1\" a Month")) {
			date = date.plusMonths(1);
		} else if (frequency.equals("\"3\" a Month")) {
			date = date.plusDays(10);
		} else if (frequency.equals("\"1\" a Quarter")) {
			date = date.plusMonths(3);
		} else if (frequency.equals("\"1\" a Year")) {
			date = date.plusMonths(12);
		}

		return date;
	}

	public UserTemplate get(Long id) {
		UserTemplate retVal = null;
		Optional<com.test.templatebuilderserver.entity.UserTemplate> template = userTemplateRepository.findById(id);
		if (template.isPresent()) {
			retVal = new UserTemplate(template.get().getId(), template.get().getName(),
					ClobToStringConvertUtility.clobToString(template.get().getData()), template.get().getDescription(),
					template.get().getUserId(), template.get().getStatus(), template.get().getCategory(),
					template.get().getCreatedDateTime().format(formatter),
					template.get().getUpdatedDateTime().format(formatter), (template.get().getDueDateTime() != null
							? template.get().getDueDateTime().format(formatter) : null),
					"");
		}
		return retVal;
	}

	public List getAll(String userId) {
		return convertToDtos(userTemplateRepository.getAll(userId));
	}

	public List<Dashboard> getDashboardCount(String userId) {
		List<Object[]> statusCount = userTemplateRepository.getDashboardCount((userId));

		List<Dashboard> dashboards = new ArrayList<Dashboard>();

		for (Object[] result : statusCount) {
			String status = (String) result[0];
			Long count = (Long) result[1];
			dashboards.add(new Dashboard(status, count,""));
		}
		return dashboards;
	}

	String getStatusColor(String status) {
		String color = "primary";
		if (status == "done") {
			color = "textPrimary";
		} else if (status == "inprogress") {
			color = "secondary";
		}
		return color;
	}

	public UserTemplate update(Long id, String userId, UserTemplate template, UserTemplate existingData) {
		LocalDateTime date = LocalDateTime.now();
		System.out.println("Date time " + date);
		LocalDateTime createdDateTime = LocalDateTime.parse(existingData.getCreatedDateTime(), formatter);

		LocalDateTime dueDateTime = LocalDateTime.parse(existingData.getDueDateTime(), formatter);
		/*
		 * if (existingData.getDueDateTime() != null) { dueDateTime =
		 * LocalDateTime.parse(existingData.getDueDateTime(), formatter); } else
		 * { dueDateTime = getDueDate(template.getFrequency(),
		 * LocalDateTime.parse(existingData.getCreatedDateTime(), formatter)); }
		 */

		if (date.isAfter(dueDateTime)) {
			dueDateTime = getDueDate(template.getFrequency(), date);
		}
		userTemplateRepository.save(new com.test.templatebuilderserver.entity.UserTemplate(id, userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), createdDateTime, date, dueDateTime));
		return template;
	}

	private List convertToDtos(List<com.test.templatebuilderserver.entity.UserTemplate> list) {

		List retVal = new ArrayList();
		list.forEach(template -> retVal.add(new UserTemplate(template.getId(), template.getName(),
				ClobToStringConvertUtility.clobToString(template.getData()), template.getDescription(),
				template.getUserId(), template.getStatus(), template.getCategory(),
				template.getCreatedDateTime().format(formatter), template.getUpdatedDateTime().format(formatter),
				(template.getDueDateTime() != null ? template.getDueDateTime().format(formatter) : null), "")));
		return retVal;
	}
}
