package com.test.templatebuilderserver.util;

import java.time.LocalDate;

import com.test.templatebuilderserver.enums.Frequency;

public class DateUtil {
	public static LocalDate getDueDate(String frequency, LocalDate date) {
		LocalDate retVal = date;
		if (Frequency.Weekly.name().equals(frequency)) {
			retVal = date.plusWeeks(1).minusDays(date.getDayOfWeek().getValue() - 1);
		}
		else if (Frequency.Monthly.name().equals(frequency)) {
			retVal = date.plusMonths(2).minusDays(1);
		}
		else if (Frequency.Quarterly.name().equals(frequency)) {
			retVal = date.minusMonths(date.getMonthValue()%3).withDayOfMonth(1).minusDays(1).plusMonths(7);
		}
		else if (Frequency.Annual.name().equals(frequency)) {
			retVal = date.plusYears(1).withMonth(12).withDayOfMonth(1).plusMonths(1).minusDays(1);
		}
		return retVal;
	}
}
