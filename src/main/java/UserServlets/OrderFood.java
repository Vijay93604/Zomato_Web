package UserServlets;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import model.DbService;

@WebServlet("/OrderFood")
public class OrderFood extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			String json = "";
			String inp = "";
			BufferedReader br = request.getReader();
			
			while((inp = br.readLine()) != null) {
				json += inp;
			}
			
			JSONObject jsonValue = new JSONObject();
			JSONParser jp = new JSONParser();
			
			try {
				jsonValue = (JSONObject)jp.parse(json);
			}catch(Exception ex) {
				ex.printStackTrace();
			}
			Cookie[] cookie = request.getCookies();
			
			
			response.getWriter().append(DbService.orderFood(jsonValue ,cookie));
			
	}

}
