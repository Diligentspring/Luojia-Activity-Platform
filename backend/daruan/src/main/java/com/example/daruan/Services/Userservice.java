package com.example.daruan.Services;

import java.util.List;

import com.example.daruan.entity.Activity;
import com.example.daruan.entity.Comment;
import com.example.daruan.entity.User;

public interface Userservice {
    int createuser(User user); 
    User getUserInfoByAccount(String username);
    User getUserInfoByid(int userid);
    void update(User user); //更新用户信息
    List<Activity> userpubactivity(int userid); //查看用户发布的所有活动
    List<Integer> userregactid(int userid); //查看用户参与的所有活动编号
    Integer userstatistics();
    void updateavatar(int id,String avatar);
    List<Comment> usercomment(int actid);
}
