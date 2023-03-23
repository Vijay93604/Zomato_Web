package UserServlets;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import ApplicationVariables.DbConnection;


@WebServlet("/ViewProfile")
public class ViewProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Cookie[] cArr = request.getCookies();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String num = "";
		JSONObject json = new JSONObject();
		for(Cookie c : cArr) {
			if(c.getName().equals("SessionId")) {
				String loginSession = c.getValue();
				try {
					ps = DbConnection.dbConnection.prepareStatement("select Phone_Number from Session where session_Id=?");
					ps.setString(1, loginSession);
					rs = ps.executeQuery();
					if(rs.next()) {
						num = rs.getString(1);
						ps = DbConnection.dbConnection.prepareStatement("select Name,Location,Phone_Number from Customer_Details where Phone_Number=?");
						ps.setString(1, num);
						rs = ps.executeQuery();
						if(rs.next()) {
							json.put("userName", rs.getString(1));
							json.put("userLocation", rs.getString(2));
							json.put("userNumber", rs.getString(3));
							response.getWriter().append(json.toJSONString());
							return;
						}
					}
				}catch(Exception ex) {
					ex.printStackTrace();
				}
				
				response.getWriter().append("Unsuccess");
				return;
				
			}
		}
	}

}
