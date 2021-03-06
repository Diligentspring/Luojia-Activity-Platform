package com.example.daruan.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.daruan.Services.Impl.ActivityImpl;
import com.example.daruan.Services.Impl.UserImpl;
import com.example.daruan.entity.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/activity")
@CrossOrigin(originPatterns="*",methods= {RequestMethod.GET, RequestMethod.POST})
public class activitycontroller {
    @Autowired
    ActivityImpl activityservice;
    @Autowired
    UserImpl service;

    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @GetMapping("/getall")
    public JSONObject GetallActivity(HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        activitylist = activityservice.getallactivity();
        Date now = new Date();
        String nowtime = df.format(now);
        Date nowdate = null;
        try {
            nowdate = df.parse(nowtime);
        } catch (ParseException e) {
        }
        for(Activity activity:activitylist){
        	Integer actid = activity.getId();
        	//System.err.println(actid);
        	Integer like = activityservice.querylike(actid);
        	Integer hate = activityservice.queryhate(actid);
        	activity.setAlready_register(activityservice.queryalreadypeople(actid));
        	activity.setLike(like);
        	activity.setHate(hate);
        	
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
        	activity.setOrganizer(organizer);
        	
//        	System.err.println("like");
//        	System.err.println(activity.getLike());
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
        result.put("msg","??????????????????");
        result.put("code",1);
        return result;
    }

    @GetMapping("/filter")
    public JSONObject FilterActivity(int key, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        Date now = new Date();
        String nowtime = df.format(now);
        System.err.println(nowtime);
        if(key==1){  //????????????
            System.err.println(key);
            activitylist = activityservice.notstart(nowtime);
        }
        else if(key==2){ //???????????????
            System.err.println(key);
            activitylist = activityservice.register(nowtime);
        }
        else if(key==3){ //????????????
            System.err.println(key);
            activitylist = activityservice.haventstart(nowtime);
        }
        else if(key==4){ //???????????????
            System.err.println(key);
            activitylist = activityservice.inprogress(nowtime);
        }
        else if(key==5){ //?????????
            System.err.println(key);
            activitylist = activityservice.complete(nowtime);
        }
        for(Activity activity:activitylist) {
        	Integer actid = activity.getId();
        	Integer like = activityservice.querylike(actid);
        	Integer hate = activityservice.queryhate(actid);
        	activity.setLike(like);
            activity.setAlready_register(activityservice.queryalreadypeople(actid));
        	activity.setHate(hate);
        	activity.setState(key);
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
        	activity.setOrganizer(organizer);
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
        result.put("msg","?????????????????????");
        result.put("code",1);
        result.put("key",key);
        return result;
    }
    
    @GetMapping("/query")
    public JSONObject QueryActivity(String title, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        activitylist = activityservice.queryactivity(title);
        for(Activity activity:activitylist) {
        	Integer actid = activity.getId();
        	Integer like = activityservice.querylike(actid);
        	Integer hate = activityservice.queryhate(actid);
            activity.setAlready_register(activityservice.queryalreadypeople(actid));
        	activity.setLike(like);
        	activity.setHate(hate);
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
        	activity.setOrganizer(organizer);
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
        result.put("msg","??????????????????");
        result.put("code",1);
        return result;
    }
    
    @PostMapping("/publish")
    public JsonNode newactivity(@RequestBody Activity activity, HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        activity.setOrganizerid(userid);
        activity.setAlready_register(0);
        activityservice.newactivity(activity);
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code", 1);
        result.put("msg","?????????????????????");
        return result;
    }
    
    @PostMapping("/modify")
    public JsonNode modactivity(@RequestBody Activity activity, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        activity.setOrganizerid(userid);
        activityservice.modactivity(activity);
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code", 1);
        result.put("msg","?????????????????????");
        return result;
    }
    
    @PostMapping("/register")
    public JsonNode regactivity(@RequestParam(value="actid") Integer actid, HttpServletRequest request){
        ObjectNode result = new ObjectMapper().createObjectNode();
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        Activity activity = activityservice.showactdetail(actid);
        Integer already = activityservice.queryalreadypeople(actid);
        if(already>=activity.getNumber_people()){
            result.put("code", 0);
            result.put("msg","??????????????????????????????");
            return result;
        }

        //System.err.print(actid);
        activityservice.interactivity(userid, actid);
        //activityservice.register(actid);

        result.put("code", 1);
        result.put("msg","???????????????");
        return result;
    }
    
    @PostMapping("/quit")
    public JsonNode quitactivity(@RequestParam(value="actid") Integer actid, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        //System.err.print(actid);
        activityservice.quitactivity(userid, actid);
        //activityservice.deregister(actid);
        
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code", 1);
        result.put("msg","?????????????????????");
        return result;
    }
    
    @PostMapping("/cancel")
    public JsonNode cancelactivity(@RequestParam(value="actid") Integer actid){
        activityservice.cancelactivity(actid);
        activityservice.cancelregister(actid);
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code", 1);
        result.put("msg","?????????????????????");
        return result;
    }
    
    @GetMapping("/activitystatistics")
    public Integer ActivityStatistics(){
        Integer result = activityservice.activitystatistics();
        return result;
    }
    
    @GetMapping("/activityinprogress")
    public Integer ActivityInProgress(){
    	Date now = new Date();
        String nowtime = df.format(now);
        Integer result = activityservice.activityinprogress(nowtime);
        return result;
    }
    
    @PostMapping("/likeactivity")
    public JsonNode likeactivity(Integer actid, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        Integer flag = activityservice.queryuserlikehate(userid, actid);
        //System.err.println(flag);
        ObjectNode result = new ObjectMapper().createObjectNode();
        if(flag != 0) {
	        result.put("code", 0);
	        result.put("msg","???????????????");
        }
        else {
        	activityservice.likeactivity(userid, actid);
	        result.put("code", 1);
	        result.put("msg","???????????????");
        }
        return result;
    }
    
    @PostMapping("/hateactivity")
    public JsonNode hateactivity(Integer actid, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        Integer flag = activityservice.queryuserlikehate(userid, actid);
        ObjectNode result = new ObjectMapper().createObjectNode();
        if(flag != 0) {
	        result.put("code", 0);
	        result.put("msg","???????????????");
        }
        else {
        	activityservice.hateactivity(userid, actid);
	        result.put("code", 1);
	        result.put("msg","???????????????");
        }
        return result;
    }
    
    @PostMapping("/cancellike")
    public JsonNode cancellike(Integer actid, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        ObjectNode result = new ObjectMapper().createObjectNode();
        activityservice.cancellike(userid, actid);
	    result.put("code", 1);
	    result.put("msg","???????????????");
        return result;
    }
    
    @PostMapping("/cancelhate")
    public JsonNode cancelhate(Integer actid, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        ObjectNode result = new ObjectMapper().createObjectNode();
        activityservice.cancelhate(userid, actid);
	    result.put("code", 1);
	    result.put("msg","???????????????");
        return result;
    }

    @PostMapping("/addcomment")
    public JsonNode addcomment(@RequestBody Comment comment, HttpServletRequest request){
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
        comment.setUserid(userid);
        comment.setTime(nowtime);
        System.err.println(comment.getContent());
        ObjectNode result = new ObjectMapper().createObjectNode();
        activityservice.addcomment(comment);
        result.put("code", 1);
        result.put("msg","???????????????");
        return result;
    }

    @PostMapping("/deletecomment")
    public JsonNode addcomment(int id, HttpServletRequest request){
        ObjectNode result = new ObjectMapper().createObjectNode();
        activityservice.deletecomment(id);
        result.put("code", 1);
        result.put("msg","???????????????");
        return result;
    }

    @GetMapping("/showactcomment")
    public JSONObject showactcomment(Integer actid, HttpServletRequest request){
        JSONObject result = new JSONObject();
        List<Comment> commentlist = new ArrayList<>();
        commentlist = activityservice.actcomment(actid);
        for(Comment comment:commentlist){
            User thisuser = service.getUserInfoByid(comment.getUserid());
            String username = thisuser.getUsername();
            comment.setUsername(username);
            comment.setAvatar(thisuser.getAvatar());
        }
        result.put("data",commentlist);
        result.put("msg","??????????????????");
        result.put("code",1);
        return result;
    }

    @GetMapping("/showactdetail")
    public JSONObject showactdetail(Integer actid, HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        JSONObject result = new JSONObject();
        Activity act = activityservice.showactdetail(actid);
        act.setAlready_register(activityservice.queryalreadypeople(actid));
        String username = service.getUserInfoByid(act.getOrganizerid()).getUsername();
        act.setOrganizer(username);
        if(activityservice.queryuserlike(userid, actid) == 1) {
            act.setLike_this(1);
        }
        if(activityservice.queryuserhate(userid, actid) == 1) {
            act.setHate_this(1);
        }
        if(activityservice.queryuserpar(userid, actid) == 1) {
            act.setParticipated(1);
        }
        List<Integer> useridlist = new ArrayList<>();
        useridlist = activityservice.querymem(actid);
        List<User> userlist = new ArrayList<>();
        for(Integer thisuserid: useridlist){
            User thisuser = service.getUserInfoByid(thisuserid);
            thisuser.setPassword("");
            userlist.add(thisuser);
        }
        act.setParticipator(userlist);
        result.put("data",act);
        result.put("msg","??????????????????");
        result.put("code",1);
        return result;
    }

    @GetMapping("/getmembers")
    public JSONObject getmembers(Integer actid){
        JSONObject result = new JSONObject();
        List<Integer> useridlist = new ArrayList<>();
        useridlist = activityservice.querymem(actid);
        List<User> userlist = new ArrayList<>();
        for(Integer userid: useridlist){
            User thisuser = service.getUserInfoByid(userid);
            thisuser.setPassword("");
            userlist.add(thisuser);
        }
        result.put("data",userlist);
        result.put("msg","??????????????????");
        result.put("code",1);
        return result;
    }

}
