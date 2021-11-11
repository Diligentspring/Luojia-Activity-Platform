package com.example.daruan.Services;

import com.example.daruan.entity.Activity;

import java.util.List;

public interface Activityservice {
    List<Activity> getallactivity();
    List<Activity> notstart(String nowtime);
    List<Activity> register(String nowtime);
    List<Activity> inprogress(String nowtime);
    List<Activity> complete(String nowtime);
    List<Activity> haventstart(String nowtime);
    List<Activity> queryactivity(String title); //通过标题查询活动
    void newactivity(Activity activity);
    void modactivity(Activity activity);
    void interactivity(Integer userid, Integer actid);
    void register(Integer actid);
    void quitactivity(Integer userid, Integer actid);
    void deregister(Integer actid);
    void cancelactivity(Integer actid);
    void cancelregister(Integer actid);
    Activity queryactbyid(Integer actid);//通过活动id查询活动
    Integer activitystatistics();
    Integer activityinprogress(String nowtime);
    Integer querylike(Integer actid);
    Integer queryhate(Integer actid);
    Integer queryuserlikehate(Integer userid, Integer actid);
    Integer queryuserlike(Integer userid, Integer actid);
    Integer queryuserhate(Integer userid, Integer actid);
    Integer queryuserpar(Integer userid, Integer actid);
    void likeactivity(Integer userid, Integer actid);
    void hateactivity(Integer userid, Integer actid);
    void cancellike(Integer userid, Integer actid);
    void cancelhate(Integer userid, Integer actid);
}
