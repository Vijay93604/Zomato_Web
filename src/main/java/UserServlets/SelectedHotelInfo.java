package UserServlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ApplicationVariables.DbConnection;
import model.DbService;

@WebServlet("/SelectedHotelInfo")
public class SelectedHotelInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int hotelid = Integer.valueOf((String)request.getParameter("hotelId"));
		response.getWriter().append(DbService.getDetailsOfSelectedHotel(hotelid));
		
	}

}
