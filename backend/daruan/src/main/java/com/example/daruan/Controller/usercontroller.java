package com.example.daruan.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.daruan.Services.Impl.UserImpl;
import com.example.daruan.entity.Activity;
import com.example.daruan.entity.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.models.auth.In;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class usercontroller {
    @Autowired
    UserImpl service;
    @PostMapping("/register")
    public JsonNode newuser(@RequestBody User user){
        ObjectNode result = new ObjectMapper().createObjectNode();
        String existname = service.getUserInfoByAccount(user.getUsername()).getUsername();
        if(existname!=null){
            result.put("code",0);
            result.put("msg","用户名存在！");
        }
        else {
            int status = service.createuser(user);
            result.put("code:", status);
            result.put("msg","注册成功！");
        }
        return result;
    }

    /**
     * 执行登录
     */
    @GetMapping("/login")
    public JSONObject doLogin(String username, String password, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        // 最终返回的对象
        JSONObject res = new JSONObject();
        res.put("code", 0);
        if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
            res.put("msg", "请输入用户名或密码");
            return res;
        }
        User dbUser = service.getUserInfoByAccount(username);
        String userid = "" + dbUser.getId();
        if (null == userid) {
            res.put("msg", "该账号不存在，请检查后重试");
            return res;
        }
        // 验证密码是否正确

        if (!password.equals(dbUser.getPassword())) {
            res.put("msg", "用户名或密码错误，请检查后重试");
            return res;
        }

        // 将登录用户信息保存到session中
        session.setAttribute("user_session", dbUser);
        // 保存cookie，实现自动登录
        Cookie cookie_userid = new Cookie("cookie_userid", userid);
        // 设置cookie的持久化时间，30天
        cookie_userid.setMaxAge(30 * 24 * 60 * 60);
        // 设置为当前项目下都携带这个cookie
        cookie_userid.setPath(request.getContextPath());
        // 向客户端发送cookie
        response.addCookie(cookie_userid);
        res.put("code", 1);
        res.put("msg", "登录成功");
        return res;
    }

    @GetMapping("/logout")
    public String logout(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        // 删除session里面的用户信息
        session.removeAttribute("user_session");
        // 保存cookie，实现自动登录
        Cookie cookie_userid = new Cookie("cookie_userid", "");
        // 设置cookie的持久化时间，0
        cookie_userid.setMaxAge(0);
        // 设置为当前项目下都携带这个cookie
        cookie_userid.setPath(request.getContextPath());
        // 向客户端发送cookie
        response.addCookie(cookie_userid);
        return "login";
    }

    @GetMapping("/currentUser")
    public JSONObject current(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        JSONObject res = new JSONObject();
        Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        User userinfo = service.getUserInfoByid(userid);
        res.put("userinfo",userinfo);
        res.put("code",1);
        res.put("msg","获取成功");
        return res;
    }
    
    @PostMapping("/update")
    public JsonNode update(@RequestBody User user, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        user.setId(userid);
        service.update(user);
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code:", 1);
        result.put("msg","更新成功！");
        return result;
    }

}
