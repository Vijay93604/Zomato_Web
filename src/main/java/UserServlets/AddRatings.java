package UserServlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import model.DbService;

/**
 * Servlet implementation class AddRatings
 */
@WebServlet("/AddRatings")
public class AddRatings extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String comments = request.getParameter("comment");
		String starRatings = request.getParameter("star");
		int hotelId = Integer.valueOf(request.getParameter("hotelId"));
		Cookie[] cookies = request.getCookies();
		response.getWriter().append(DbService.addRatings(comments, starRatings ,cookies ,hotelId));
	}

}
