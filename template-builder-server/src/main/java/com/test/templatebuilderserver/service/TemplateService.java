package com.test.templatebuilderserver.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.templatebuilderserver.dto.Template;
import com.test.templatebuilderserver.repository.TemplateRepository;
import com.test.templatebuilderserver.util.ClobToStringConvertUtility;

@Service
public class TemplateService {

	@Autowired
	TemplateRepository templateRepository;

	@Transactional
	public Long save(Template template) {
		return templateRepository.save(new com.test.templatebuilderserver.entity.Template(template.getName(),
				template.getClinic(), template.getDescription(), template.getCategory(), template.getFrequency(),
				ClobProxy.generateProxy(template.getTemplate()))).getId();
	}

	public Template get(Long id) {

		Template retVal = null;
		Optional<com.test.templatebuilderserver.entity.Template> template = templateRepository.findById(id);
		if (template.isPresent()) {
			retVal = new Template(template.get().getId(), template.get().getName(), template.get().getClinic(),
					template.get().getDescription(), template.get().getCategory(), template.get().getFrequency(),
					ClobToStringConvertUtility.clobToString(template.get().getData()));
		}
		return retVal;
	}

	public List getAll() {
		return convertToDtos(templateRepository.getAll());
	}

	public Template update(Long id, Template template) {
		Template retVal = null;
		Optional<com.test.templatebuilderserver.entity.Template> existingTemplate = templateRepository.findById(id);
		if (existingTemplate.isPresent()) {
			templateRepository.save(new com.test.templatebuilderserver.entity.Template(template.getId(),
					template.getName(), template.getClinic(), template.getDescription(), template.getCategory(),
					template.getFrequency(), ClobProxy.generateProxy(template.getTemplate())));
			retVal = template;
		}
		return retVal;
	}

	private List convertToDtos(List<com.test.templatebuilderserver.entity.Template> all) {
		List retVal = new ArrayList();
		all.forEach(template -> retVal.add(new Template(template.getId(), template.getName(), template.getClinic(),
				template.getDescription(), template.getCategory(), template.getFrequency(),
				ClobToStringConvertUtility.clobToString(template.getData()))));
		return retVal;
	}

}
