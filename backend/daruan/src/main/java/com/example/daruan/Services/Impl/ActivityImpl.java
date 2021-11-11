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
    public Activity queryactbyid(Integer actid) {
    	return activitymapper.queryactbyid(actid);
    }
    public Integer activitystatistics() {
    	return activitymapper.activitystatistics();
    }
    public Integer activityinprogress(String nowtime) {
    	return activitymapper.activityinprogress(nowtime);
    }
    public Integer querylike(Integer actid) {
    	return activitymapper.querylike(actid);
    }
    public Integer queryhate(Integer actid) {
    	return activitymapper.queryhate(actid);
    }
    public Integer queryuserlikehate(Integer userid, Integer actid) {
    	return activitymapper.queryuserlikehate(userid, actid);
    }
    public Integer queryuserlike(Integer userid, Integer actid) {
    	return activitymapper.queryuserlike(userid, actid);
    }
    public Integer queryuserhate(Integer userid, Integer actid) {
    	return activitymapper.queryuserhate(userid, actid);
    }
    public void likeactivity(Integer userid, Integer actid) {
    	activitymapper.likeactivity(userid, actid);
    }
    public void hateactivity(Integer userid, Integer actid) {
    	activitymapper.hateactivity(userid, actid);
    }
    public void cancellike(Integer userid, Integer actid) {
    	activitymapper.cancellike(userid, actid);
    }
    public void cancelhate(Integer userid, Integer actid) {
    	activitymapper.cancelhate(userid, actid);
    }
    public Integer queryuserpar(Integer userid, Integer actid) {
    	return activitymapper.queryuserpar(userid, actid);
    }
}
