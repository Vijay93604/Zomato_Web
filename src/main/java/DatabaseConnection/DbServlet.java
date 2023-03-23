package DatabaseConnection;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ApplicationVariables.DbConnection;


public class DbServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public void init() {
		try {
			DbConnection.getDbConnection();
			System.out.println("DB acctivated");
		}catch(Exception ex) {
			System.out.println(ex.getMessage());
			System.exit(0);
		}
	}
}
