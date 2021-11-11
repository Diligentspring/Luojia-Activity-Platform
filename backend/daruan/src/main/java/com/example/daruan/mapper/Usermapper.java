package com.example.daruan.mapper;

import java.util.List;

import com.example.daruan.entity.Activity;
import com.example.daruan.entity.User;
public interface Usermapper {
    int createuser(User user);
    User getUserInfoByAccount(String username);
    User getUserInfoByid(int userid);
    void updateuser(User user);
    List<Activity> userpubactivity(int userid);
    List<Integer> userregactid(int userid); //查看用户参与的所有活动编号
    Integer userstatistics();
    void updateavatar(int id,String avatar);
}
