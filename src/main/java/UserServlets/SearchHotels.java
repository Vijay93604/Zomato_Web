package UserServlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.DbService;

/**
 * Servlet implementation class SearchHotels
 */
@WebServlet("/SearchHotels")
public class SearchHotels extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String toSearch = request.getParameter("SearchValue");
		response.getWriter().append(DbService.searchedHotel(toSearch));
	}

}
