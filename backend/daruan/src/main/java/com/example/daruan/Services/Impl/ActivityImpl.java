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
    @Override
    public List<Activity> notstart(String nowtime){
        return activitymapper.notstart(nowtime);
    };
    @Override
    public List<Activity> register(String nowtime){
        return activitymapper.register(nowtime);
    };
    @Override
    public List<Activity> inprogress(String nowtime){
        return activitymapper.inprogress(nowtime);
    };
    @Override
    public List<Activity> complete(String nowtime){
        return activitymapper.complete(nowtime);
    };
    @Override
    public List<Activity> haventstart(String nowtime){return activitymapper.haventstart(nowtime);};
    @Override
    public List<Activity> queryactivity(String title){
        return activitymapper.queryactivity(title);
    }
    public void newactivity(Activity activity){
        activitymapper.newactivity(activity);
    }
    public void modactivity(Activity activity){
        activitymapper.modactivity(activity);
    }
    public void interactivity(Integer userid, Integer actid) {
    	activitymapper.interactivity(userid, actid);
    }
    public void register(Integer actid) {
    	activitymapper.registeractivity(actid);
    }
    public void quitactivity(Integer userid, Integer actid) {
    	activitymapper.quitactivity(userid, actid);
    }
    public void deregister(Integer actid) {
    	activitymapper.deregisteractivity(actid);
    }
    public void cancelactivity(Integer actid) {
    	activitymapper.cancelactivity(actid);
    }
    public void cancelregister(Integer actid) {
    	activitymapper.cancelregister(actid);
    }
}
