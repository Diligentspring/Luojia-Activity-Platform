package com.example.daruan.mapper;

import com.example.daruan.entity.Activity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface Activitymapper {
    List<Activity> getallactivity();
    List<Activity> notstart(String nowtime);
    List<Activity> register(String nowtime);
    List<Activity> inprogress(String nowtime);
    List<Activity> complete(String nowtime);
    List<Activity> haventstart(String nowtime);
    List<Activity> queryactivity(String title);
    void newactivity(Activity activity);
    void modactivity(Activity activity);
    void interactivity(@Param("userid") Integer userid, @Param("actid") Integer actid, @Param("role") Integer role);
}
