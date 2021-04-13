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
import com.test.templatebuilderserver.dto.Template;
import com.test.templatebuilderserver.dto.UserTemplate;
import com.test.templatebuilderserver.repository.UserTemplateRepository;
import com.test.templatebuilderserver.util.ClobToStringConvertUtility;

@Service
public class UserTemplateService {
	@Autowired
	UserTemplateRepository userTemplateRepository;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");


	@Transactional
	public Long save(String userId, UserTemplate template) {

		LocalDateTime date = LocalDateTime.now();
		LocalDateTime dueDate = getDueDate(template.getFrequency(), date);
		return userTemplateRepository.save(new com.test.templatebuilderserver.entity.UserTemplate(userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), date, date, dueDate)).getId();
	}
	
	public Long createInitialTemplate(String userId, Template template) {
		LocalDateTime date = LocalDateTime.now();
		LocalDateTime dueDate = getIntialDueDate(template.getFrequency());
		return userTemplateRepository.save(new com.test.templatebuilderserver.entity.UserTemplate(userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				"Todo", template.getCategory(), date, null, dueDate)).getId();
	}
	
	LocalDateTime getIntialDueDate(String frequency) {
		LocalDateTime retVal = LocalDateTime.now();
		if (frequency.equals("Weekly")) {
			retVal = retVal.minusDays(retVal.getDayOfWeek().getValue()).plusDays(5);
		} else if (frequency.equals("Monthly")) {
			retVal = retVal.plusMonths(1).withDayOfMonth(1).minusDays(1);
		} else if (frequency.equals("Quarterly")) {
			retVal = retVal.withDayOfMonth(1).minusMonths(retVal.getMonthValue()%3).plusMonths(4).minusDays(1);
		} else if (frequency.equals("Biannual")) {
			retVal = retVal.getMonthValue() > 6? retVal.plusYears(1).withDayOfMonth(1).withMonth(1).minusDays(1): retVal.withMonth(7).minusDays(1);
		} else if (frequency.equals("Annual")) {
			retVal = retVal.plusYears(1).withMonth(1).withDayOfMonth(1).minusDays(1);
		}
		return retVal;
	}

	LocalDateTime getDueDate(String frequency, LocalDateTime date) {

		if (frequency.equals("Weekly")) {
			date = date.minusDays(date.getDayOfWeek().getValue()).plusWeeks(1).plusDays(5);
		} else if (frequency.equals("Monthly")) {
			date = date.plusMonths(2).withDayOfMonth(1).minusDays(1);
		} else if (frequency.equals("Quarterly")) {
			date = date.withDayOfMonth(1).minusMonths(date.getMonthValue()%3).plusMonths(7).minusDays(1);
		} else if (frequency.equals("Biannual")) {
			date = date.getMonthValue() <= 6? date.plusYears(1).withDayOfMonth(1).withMonth(1).minusDays(1): date.plusYears(1).withMonth(7).minusDays(1);
		} else if (frequency.equals("Annual")) {
			date = date.plusYears(2).withMonth(1).withDayOfMonth(1).minusDays(1);
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
		return convertToDtos(userTemplateRepository.getAll(userId, new String[]{"Todo", "inprogress"}));
	}

	public List<Dashboard> getDashboardCount(String userId) {
		LocalDateTime currTime = LocalDateTime.now();
		List<Object[]> statusCount = userTemplateRepository.getDashboardCount(userId, currTime);
		
		List<Dashboard> dashboards = new ArrayList<Dashboard>();
		for (Object[] result : statusCount) {
			String status = (String) result[0];
			Long count = (Long) result[1];
			dashboards.add(new Dashboard(status, count, getStatusColor(status)));
		}
		Long overdueCount = userTemplateRepository.getOverdueCount(userId, currTime);
		dashboards.add(new Dashboard("Overdue", overdueCount, "error"));
		return dashboards;
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
				template.getCreatedDateTime().format(formatter), 
				template.getUpdatedDateTime() != null? template.getUpdatedDateTime().format(formatter): null,
				(template.getDueDateTime() != null ? template.getDueDateTime().format(formatter) : null), "")));
		return retVal;
	}
}
