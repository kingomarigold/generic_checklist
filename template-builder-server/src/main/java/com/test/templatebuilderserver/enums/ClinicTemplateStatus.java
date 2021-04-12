package com.test.templatebuilderserver.enums;

import lombok.Getter;

public enum ClinicTemplateStatus {
	NOT_STARTED("Not Started"),
	IN_PROGRESS("In Progress"),
	COMPLETE("Complete");
	
	@Getter
	private String statusStr;
	
	private ClinicTemplateStatus(String status) {
		this.statusStr = status;
	}
}
