package com.test.templatebuilderserver.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

		System.out.println("Date time " + date);
		return userTemplateRepository.save(new com.test.templatebuilderserver.entity.UserTemplate(userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), date, date)).getId();
	}

	public UserTemplate get(Long id) {
		UserTemplate retVal = null;
		Optional<com.test.templatebuilderserver.entity.UserTemplate> template = userTemplateRepository.findById(id);
		if (template.isPresent()) {
			retVal = new UserTemplate(template.get().getId(), template.get().getName(),
					ClobToStringConvertUtility.clobToString(template.get().getData()), template.get().getDescription(),
					template.get().getUserId(), template.get().getStatus(), template.get().getCategory(),
					template.get().getCreatedDateTime().format(formatter),
					template.get().getUpdatedDateTime().format(formatter));
		}
		return retVal;
	}

	public List getAll(String userId) {
		return convertToDtos(userTemplateRepository.getAll(userId));
	}

	public UserTemplate update(Long id, String userId, UserTemplate template, UserTemplate existingData) {
		LocalDateTime date = LocalDateTime.now();
		System.out.println("Date time " + date);
		LocalDateTime createdDateTime = LocalDateTime.parse(existingData.getCreatedDateTime(), formatter);

		userTemplateRepository.save(new com.test.templatebuilderserver.entity.UserTemplate(id, userId,
				template.getName(), template.getDescription(), ClobProxy.generateProxy(template.getTemplate()),
				template.getStatus(), template.getCategory(), createdDateTime, date));
		return template;
	}

	private List convertToDtos(List<com.test.templatebuilderserver.entity.UserTemplate> list) {

		List retVal = new ArrayList();
		list.forEach(template -> retVal.add(new UserTemplate(template.getId(), template.getName(),
				ClobToStringConvertUtility.clobToString(template.getData()), template.getDescription(),
				template.getUserId(), template.getStatus(), template.getCategory(),
				template.getCreatedDateTime().format(formatter), template.getUpdatedDateTime().format(formatter))));
		return retVal;
	}
}
