package com.example.daruan.mapper;

import com.example.daruan.entity.Activity;
import com.example.daruan.entity.Comment;
import com.example.daruan.entity.User;
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
    void interactivity(Integer userid, Integer actid);
    void registeractivity(Integer actid);
    void quitactivity(Integer userid, Integer actid);
    void deregisteractivity(Integer actid);
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
    void likeactivity(Integer userid, Integer actid);
    void hateactivity(Integer userid, Integer actid);
    void cancellike(Integer userid, Integer actid);
    void cancelhate(Integer userid, Integer actid);
    Integer queryuserpar(Integer userid, Integer actid);
    void updateicon(Integer actid, String icon);
    void addcomment(Comment comment);
    void deletecomment(int id);
    List<Comment> actcomment(Integer actid);
    Activity showactdetail(Integer actid);
    List<Integer> querymem(Integer actid);
    Integer queryalreadypeople(Integer actid);
}
