package com.test.templatebuilderserver.web.resource;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import com.test.templatebuilderserver.BaseTest;
import com.test.templatebuilderserver.dto.Template;

class TemplateResourceTest extends BaseTest {

	@Test
	void validateTemplate_integrationTests() throws Exception {
		String templateLocation = null;
		String jsonInput = new Template("Template1", "clinic1", "Some Json Content", "test category", "freq",
				"Description of the template").toJSON();
		Given: // when there are no templates.
		mockMvc.perform(
				get("/api/templates").with(user("user").password("user")).contentType(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().json("[]"));

		When: // You create a template
		templateLocation = mockMvc
				.perform(post("/api/template").content(jsonInput).contentType(MediaType.APPLICATION_JSON)
						.with(user("admin").password("admin")))
				.andDo(print()).andExpect(status().isCreated()).andReturn().getResponse().getHeader("Location");
		Then: // The template is created.
		mockMvc.perform(
				get(templateLocation).with(user("admin").password("admin")).contentType(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(content().json(jsonInput));
		mockMvc.perform(
				get("/api/templates").with(user("user").password("user")).contentType(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(status().isOk());

		String updatedjsonInput = new Template("Template1", "clinic1", "Tempalate updated", "test category", "freq",
				"Description of the template").toJSON();
		And: // When template is updated

		mockMvc.perform(
				put(templateLocation).with(user("admin").password("admin")).contentType(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().json(updatedjsonInput));
	}

}
