package AdminServlets;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import model.DbService;

@WebServlet("/AddDeliveryBoy")
public class AddDeliveryBoy extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String inp = "";
		String json = "";
		BufferedReader br = request.getReader();
		System.out.println("ENter Delivery Boy");
		while((inp = br.readLine()) != null) {
			json += inp;
		}
		
		JSONObject jsonValue = null;
		JSONParser jp = new JSONParser();
		try {
			jsonValue = (JSONObject)jp.parse(json);
			response.getWriter().append(DbService.addDeliveryBoy(jsonValue));
		}catch(Exception ex) {
			
		}
		
		
		
	}

}
