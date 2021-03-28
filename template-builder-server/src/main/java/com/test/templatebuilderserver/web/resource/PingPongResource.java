package com.test.templatebuilderserver.web.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class PingPongResource {

	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
}
