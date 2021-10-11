package com.example.daruan.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.daruan.Services.Impl.ActivityImpl;
import com.example.daruan.entity.Activity;
import com.example.daruan.entity.User;
import com.example.daruan.entity.Useractivity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
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
public class activitycontroller {
    @Autowired
    ActivityImpl activityservice;

    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @GetMapping("/getall")
    public JSONObject GetallActivity(){
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
        }
        result.put("data",activitylist);
        result.put("msg","活动获取成功");
        result.put("code",1);
        return result;
    }

    @GetMapping("/filter")
    public JSONObject FilterActivity(int key){
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        Date now = new Date();
        String nowtime = df.format(now);
        System.err.println(nowtime);
        if(key==1){  //尚未开始
            System.err.println(key);
            activitylist = activityservice.notstart(nowtime);
        }
        else if(key==2){ //火热报名中
            System.err.println(key);
            activitylist = activityservice.register(nowtime);
        }
        else if(key==3){ //尚未开始
            System.err.println(key);
            activitylist = activityservice.haventstart(nowtime);
        }
        else if(key==4){ //正在进行中
            System.err.println(key);
            activitylist = activityservice.inprogress(nowtime);
        }
        else if(key==5){ //已结束
            System.err.println(key);
            activitylist = activityservice.complete(nowtime);
        }
        result.put("data",activitylist);
        result.put("msg","活动查询完成！");
        result.put("code",1);
        result.put("key",key);
        return result;
    }
    
    @GetMapping("/query")
    public JSONObject QueryActivity(String title){
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        activitylist = activityservice.queryactivity(title);
        result.put("data",activitylist);
        result.put("msg","活动获取成功");
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
        activity.setOrganizer(userid);
        activityservice.newactivity(activity);
        ObjectNode result = new ObjectMapper().createObjectNode();
        
        result.put("code:", 1);
        result.put("msg","活动发布成功！");
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
        activity.setOrganizer(userid);
        activityservice.modactivity(activity);
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code:", 1);
        result.put("msg","活动修改成功！");
        return result;
    }
    
    @PostMapping("/register")
    public JsonNode regactivity(@RequestParam(value="actid") Integer actid, HttpServletRequest request){
    	Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                 userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        System.err.print(actid);
        activityservice.interactivity(userid, actid, 0);
        ObjectNode result = new ObjectMapper().createObjectNode();
        result.put("code:", 1);
        result.put("msg","报名成功！");
        return result;
    }
}
