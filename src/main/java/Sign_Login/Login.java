package Sign_Login;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Enums.Role;
import model.CustomerDetails;
import model.DbService;

@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
//	static LinkedHashMap<String, CustomerDetails> loginedCustomers = new LinkedHashMap<>();
	
	public static void main(String[] args) {
		System.out.println();
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			String phoneNum = request.getParameter("phoneNum");
			String pass = request.getParameter("password");
			PrintWriter pw = response.getWriter();
			CustomerDetails loginedUser = DbService.getLoginedUser(phoneNum, pass);
			
			if(loginedUser == null) {
				pw.append("User Not Found");
				return;
			}
			
			if(loginedUser.getLoginUserRole() == Role.USER) {
//				loginedCustomers.put(loginedUser.getPhoneNumber(), loginedUser);
				String uid = UUID.randomUUID().toString();
				Cookie cookie = new Cookie("SessionId", uid);
				response.addCookie(cookie);
				DbService.addCookie(uid,loginedUser.getPhoneNumber());
				pw.append("User Found");
			}
			if(loginedUser.getLoginUserRole() == Role.ADMIN) {
//				loginedCustomers.put(loginedUser.getPhoneNumber(), loginedUser);
				String uid = UUID.randomUUID().toString();
				Cookie cookie = new Cookie("SessionId", uid);
				response.addCookie(cookie);
				DbService.addCookie(uid,loginedUser.getPhoneNumber());
				pw.append("Admin Login Success");
			}
	}

}
                                      



