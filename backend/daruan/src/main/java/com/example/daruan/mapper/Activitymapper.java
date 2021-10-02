package com.example.daruan.mapper;

import com.example.daruan.entity.Activity;

import java.util.List;

public interface Activitymapper {
    List<Activity> getallactivity();
    List<Activity> notstart(String nowtime);
    List<Activity> register(String nowtime);
    List<Activity> inprogress(String nowtime);
    List<Activity> complete(String nowtime);
}
