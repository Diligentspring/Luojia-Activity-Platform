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
}
