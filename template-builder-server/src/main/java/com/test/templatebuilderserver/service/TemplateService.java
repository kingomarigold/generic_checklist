package com.test.templatebuilderserver.service;

import java.io.IOException;
import java.io.Reader;
import java.io.StringWriter;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.io.IOUtils;
import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.templatebuilderserver.dto.Template;
import com.test.templatebuilderserver.repository.TemplateRepository;

@Service
public class TemplateService {

	@Autowired
	TemplateRepository templateRepository;

	@Transactional
	public Long save(Template template) {
		return templateRepository.save(new com.test.templatebuilderserver.entity.Template(template.getName(),
				ClobProxy.generateProxy(template.getTemplate()), template.getDescription())).getId();
	}

	public Template get(Long id) {

		Template retVal = null;
		Optional<com.test.templatebuilderserver.entity.Template> template = templateRepository.findById(id);
		if (template.isPresent()) {
			retVal = new Template(template.get().getId(), template.get().getName(),
					clobToString(template.get().getData()), template.get().getDescription());
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
					template.getName(), ClobProxy.generateProxy(template.getTemplate()), template.getDescription()));
			retVal = template;
		}
		return retVal;
	}

	private List convertToDtos(List<com.test.templatebuilderserver.entity.Template> all) {
		List retVal = new ArrayList();
		all.forEach(template -> retVal.add(new Template(template.getId(), template.getName(),
				template.getData() != null ? clobToString(template.getData()) : null, template.getDescription())));
		return retVal;
	}

	public static String clobToString(final Clob clob) {
		try (final Reader reader = clob.getCharacterStream()) {
			try (final StringWriter stringWriter = new StringWriter()) {
				IOUtils.copy(reader, stringWriter);
				return stringWriter.toString();
			}
		} catch (IOException | SQLException e) {

			e.printStackTrace();
		}
		return null;
	}
}
