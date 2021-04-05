package com.test.templatebuilderserver.util;

import java.io.IOException;
import java.io.Reader;
import java.io.StringWriter;
import java.sql.Clob;
import java.sql.SQLException;

import org.apache.commons.io.IOUtils;

public class ClobToStringConvertUtility {

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
