package Filters;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;

import ApplicationVariables.DbConnection;

@WebFilter("/zomato/*")
public class Authentication extends HttpFilter implements Filter {
       
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {					               
		System.out.println("Enter Filter");
		HttpServletRequest req = (HttpServletRequest)request;
		Cookie[] cookies = req.getCookies();
		PreparedStatement ps = null;
		ResultSet rs = null;
		if(cookies != null) {
			for(Cookie c : cookies) {
				if(c.getName().equals("SessionId")) {
					String sId = c.getValue();
					try {
						ps = DbConnection.dbConnection.prepareStatement("Select * from Session where session_Id=?");
						ps.setString(1, sId);
						rs = ps.executeQuery();
						if(rs.next()) {
							ps = DbConnection.dbConnection.prepareStatement("Select * from Customer_Details where Phone_Number=?");
							ps.setString(1, rs.getString(1));
							rs = ps.executeQuery();
							if(rs.next()) {
								if(rs.getString(5).equals("USER")) {
									response.getWriter().append("User Login");
									chain.doFilter(req, response);
								}else {
									response.getWriter().append("Admin Login");	
									chain.doFilter(req, response);
								}
							}
						}

					}catch(Exception ex) {
						
					}
				}
			}
		}else {
			response.getWriter().append("user Not found");
		}
	}

}
