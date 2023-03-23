package Check;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ApplicationVariables.DbConnection;

@WebServlet("/DeleteCookie")
public class DeleteCookie extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			System.out.println("Hello");
		Cookie[] cookie = request.getCookies();
		PreparedStatement ps = null;
		ResultSet rs = null;
		if(cookie != null) {
			for(Cookie c : cookie) {
				if(c.getName().equals("SessionId")) {
					String sId = c.getValue();
					try {
						ps = DbConnection.dbConnection.prepareStatement("Select * from Session");
						rs = ps.executeQuery();
						while(rs.next()) {
							if(sId.equals(rs.getString(2))) {
								ps = DbConnection.dbConnection.prepareStatement("Delete from Session where session_Id=?");
								ps.setString(1, sId);
								ps.execute();
								response.getWriter().append("Deleted");
							}
						}
					}catch(Exception ex) {
						
					}
					
				}
			}
		}
	}

}
