package com.test.templatebuilderserver.service;

import java.io.IOException;
import java.io.Reader;
import java.io.StringWriter;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
				ClobProxy.generateProxy(template.getTemplate()))).getId();
	}

	public Template get(Long id) {
		
		Template retVal = null;
		Optional<com.test.templatebuilderserver.entity.Template> template = templateRepository.findById(id);
		if (template.isPresent()) {
			retVal = new Template(template.get().getId(), template.get().getName(),
					clobToString(template.get().getData()));
		}
		return retVal;
	}

	public List getAll() {
		
		return templateRepository.getAll(); 
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
