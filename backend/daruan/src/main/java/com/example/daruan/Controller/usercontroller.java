package com.example.daruan.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.daruan.Services.Impl.UserImpl;
import com.example.daruan.Services.Impl.ActivityImpl;
import com.example.daruan.entity.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.models.auth.In;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
@CrossOrigin(originPatterns="*",methods= {RequestMethod.GET, RequestMethod.POST})
public class usercontroller {
    @Autowired
    UserImpl service;
    @Autowired
    ActivityImpl activityservice;
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @PostMapping("/register")
    public JsonNode newuser(@RequestBody User user){
        ObjectNode result = new ObjectMapper().createObjectNode();
        //System.err.println(user.getUsername());
        User existname = service.getUserInfoByAccount(user.getUsername());
        //System.err.println(user.getUsername());
        if(existname!=null){
            result.put("code",0);
            result.put("msg","用户名存在！");
        }
        else {
            int status = service.createuser(user);
            result.put("code", status);
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

        cookie_userid.setPath("/");
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
        cookie_userid.setPath("/");
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
        res.put("data",userinfo);
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
        result.put("code", 1);
        result.put("msg","更新成功！");
        return result;
    }

    @GetMapping("/userpubactivity")
    public JSONObject userpubactivity(HttpServletRequest request) {
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        Date now = new Date();
        String nowtime = df.format(now);
        Date nowdate = null;
        try {
            nowdate = df.parse(nowtime);
        } catch (ParseException e) {
        }
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        activitylist = service.userpubactivity(userid);
        for (Activity activity : activitylist) {
        	Integer actid = activity.getId();
            activity.setAlready_register(activityservice.queryalreadypeople(actid));
        	if(activityservice.queryuserpar(userid, actid) == 1) {
        		activity.setParticipated(1);
        	}
        	Integer organizerid = activity.getOrganizerid();
        	if(activityservice.queryuserlike(userid, actid) == 1) {
        		activity.setLike_this(1);
        	}
        	if(activityservice.queryuserhate(userid, actid) == 1) {
        		activity.setHate_this(1);
        	}
        	User Organizer = service.getUserInfoByid(organizerid);
        	String organizer = Organizer.getUsername();
            activity.setLike(activityservice.querylike(actid));
            activity.setHate(activityservice.queryhate(actid));
        	activity.setOrganizer(organizer);
            String start = activity.getStart();
            String deadline = activity.getDeadline();
            String time_start = activity.getTime_start();
            String time_end = activity.getTime_end();
            Date starttime = null;
            Date deadtime = null;
            Date activitystart = null;
            Date activityend = null;

            try {
                starttime = df.parse(start);
                deadtime = df.parse(deadline);
                activitystart = df.parse(time_start);
                activityend = df.parse(time_end);
            } catch (ParseException e) {
            }
            if(nowdate.before(starttime)){
                activity.setState(1);
                System.err.println('1');
            }
            else if(nowdate.after(starttime)&&nowdate.before(deadtime)){
                activity.setState(2);
                System.err.println('2');
            }
            else if(nowdate.before(activitystart)&&nowdate.after(deadtime)){
                activity.setState(3);
                System.err.println('3');
            }
            else if(nowdate.after(activitystart)&&nowdate.before(activityend)){
                activity.setState(4);
                System.err.println('4');
            }
            else if(nowdate.after(activityend)){
                activity.setState(5);
                System.err.println(activity.getState());
                System.err.println('5');
            }
            List<Integer> useridlist = new ArrayList<>();
            useridlist = activityservice.querymem(actid);
            List<User> userlist = new ArrayList<>();
            for(Integer thisuserid: useridlist){
                User thisuser = service.getUserInfoByid(thisuserid);
                thisuser.setPassword("");
                userlist.add(thisuser);
            }
            activity.setParticipator(userlist);
        }
        result.put("data",activitylist);
        result.put("msg","活动获取成功");
        result.put("code",1);
        return result;
    }
    
    @GetMapping("/userregactivity")
    public JSONObject userregactivity(HttpServletRequest request) {
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        Date now = new Date();
        String nowtime = df.format(now);
        Date nowdate = null;
        try {
            nowdate = df.parse(nowtime);
        } catch (ParseException e) {
        }
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        List<Integer> actids = new ArrayList<>();
        actids = service.userregactid(userid);
        for (Integer actid:actids) {
        	Activity activity = new Activity();
        	activity = activityservice.queryactbyid(actid);
        	activitylist.add(activity);
        }
        for (Activity activity : activitylist) {
        	Integer actid = activity.getId();
        	activity.setParticipated(1);
            activity.setAlready_register(activityservice.queryalreadypeople(actid));
        	Integer organizerid = activity.getOrganizerid();
        	if(activityservice.queryuserlike(userid, actid) == 1) {
        		activity.setLike_this(1);
        	}
        	if(activityservice.queryuserhate(userid, actid) == 1) {
        		activity.setHate_this(1);
        	}
        	User Organizer = service.getUserInfoByid(organizerid);
        	String organizer = Organizer.getUsername();
        	activity.setOrganizer(organizer);
            activity.setLike(activityservice.querylike(actid));
            activity.setHate(activityservice.queryhate(actid));
            String start = activity.getStart();
            String deadline = activity.getDeadline();
            String time_start = activity.getTime_start();
            String time_end = activity.getTime_end();
            Date starttime = null;
            Date deadtime = null;
            Date activitystart = null;
            Date activityend = null;

            try {
                starttime = df.parse(start);
                deadtime = df.parse(deadline);
                activitystart = df.parse(time_start);
                activityend = df.parse(time_end);
            } catch (ParseException e) {
            }
            if(nowdate.before(starttime)){
                activity.setState(1);
                System.err.println('1');
            }
            else if(nowdate.after(starttime)&&nowdate.before(deadtime)){
                activity.setState(2);
                System.err.println('2');
            }
            else if(nowdate.before(activitystart)&&nowdate.after(deadtime)){
                activity.setState(3);
                System.err.println('3');
            }
            else if(nowdate.after(activitystart)&&nowdate.before(activityend)){
                activity.setState(4);
                System.err.println('4');
            }
            else if(nowdate.after(activityend)){
                activity.setState(5);
                System.err.println(activity.getState());
                System.err.println('5');
            }
            List<Integer> useridlist = new ArrayList<>();
            useridlist = activityservice.querymem(actid);
            List<User> userlist = new ArrayList<>();
            for(Integer thisuserid: useridlist){
                User thisuser = service.getUserInfoByid(thisuserid);
                thisuser.setPassword("");
                userlist.add(thisuser);
            }
            activity.setParticipator(userlist);
        }
        result.put("data",activitylist);
        result.put("msg","活动获取成功");
        result.put("code",1);
        return result;
    }
    
    @GetMapping("/userstatistics")
    public Integer UserStatistics(){
        Integer result = service.userstatistics();
        return result;
    }

    @GetMapping("/showusercomment")
    public JSONObject showusercomment(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        JSONObject result = new JSONObject();
        List<Comment> commentlist = new ArrayList<>();
        commentlist = service.usercomment(userid);
        for(Comment comment:commentlist){
            User thisuser = service.getUserInfoByid(userid);
            String username = thisuser.getUsername();
            comment.setUsername(username);
            comment.setAvatar(thisuser.getAvatar());

        }
        result.put("data",commentlist);
        result.put("msg","评论获取成功");
        result.put("code",1);
        return result;
    }

}
