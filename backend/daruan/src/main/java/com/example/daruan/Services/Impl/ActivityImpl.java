package com.example.daruan.Services.Impl;

import com.example.daruan.Services.Activityservice;
import com.example.daruan.entity.Activity;
import com.example.daruan.mapper.Activitymapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ActivityImpl implements Activityservice {
    @Resource
    private Activitymapper activitymapper;
    @Override
    public List<Activity> getallactivity(){
        return activitymapper.getallactivity();
    }
}
