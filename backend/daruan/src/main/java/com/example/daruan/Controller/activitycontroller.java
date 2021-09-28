package com.example.daruan.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.daruan.Services.Impl.ActivityImpl;
import com.example.daruan.entity.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
        result.put("res",activitylist);
        result.put("msg","活动获取成功");
        result.put("code",1);
        return result;
    }

    @GetMapping("/filter")
    public JSONObject FilterActivity(String key){
        JSONObject result = new JSONObject();
        List<Activity> activitylist = new ArrayList<>();
        Date now = new Date();
        String nowtime = df.format(now);
        System.err.println(nowtime);
        if(key=="1"){  //尚未开始

        }
        else if(key=="2"){ //火热报名中

        }
        else if(key=="3"){ //正在进行中

        }
        else if(key=="4"){ //已结束

        }
        result.put("res",activitylist);
        return result;
    }
}
