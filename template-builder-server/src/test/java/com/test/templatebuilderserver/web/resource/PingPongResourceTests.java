package com.test.templatebuilderserver.web.resource;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import com.test.templatebuilderserver.BaseTest;

class PingPongResourceTests extends BaseTest {

	@Test
	void pingPong() throws Exception {
		mockMvc.perform(get("/ping").with(user("user").password("user")).contentType(MediaType.APPLICATION_JSON))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().string("pong"));

	}

}
