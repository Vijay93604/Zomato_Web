package UserServlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.DbService;

@WebServlet("/getRatingsOfSelectedHotel")
public class getRatingsOfSelectedHotel extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append(DbService.getRatings(Integer.valueOf(request.getParameter("hotelId"))));
	}

}
