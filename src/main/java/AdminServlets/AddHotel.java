package AdminServlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.parser.JSONParser;

import model.DbService;

import org.json.simple.JSONObject;


@WebServlet("/AddHotel")
public class AddHotel extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String inp = "";
		String json = "";
		BufferedReader br = request.getReader();
		
		while((inp = br.readLine()) != null) {
			json += inp;
		}

		JSONObject jsonValue = new JSONObject();
		JSONParser jp = new JSONParser();
		try {
			jsonValue = (JSONObject)jp.parse(json);
			response.getWriter().append(DbService.addHotel(jsonValue));
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
	}

}
