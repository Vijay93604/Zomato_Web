package Sign_Login;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import ApplicationVariables.DbConnection;
import model.DbService;

/**
 * Servlet implementation class SignUp
 */
@WebServlet("/SignUp")
public class SignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String inp = "";
		String json = "";
		BufferedReader br = request.getReader();
		while((inp = br.readLine()) != null) {
			json += inp;
		}
		JSONParser jp = new JSONParser();
		JSONObject jsonValue = null;
		try {
			jsonValue = (JSONObject)jp.parse(json);	
			response.getWriter().append(DbService.addNewUser(jsonValue));
		}catch(Exception ex) {
			
		}
		
		
	}

}
