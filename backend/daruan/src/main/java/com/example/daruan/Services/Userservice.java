package com.example.daruan.Services;

import java.util.List;

import com.example.daruan.entity.Activity;
import com.example.daruan.entity.User;

public interface Userservice {
    int createuser(User user);
    User getUserInfoByAccount(String username);
    User getUserInfoByid(int userid);
    void update(User user);
    List<Activity> userpubactivity(int userid);
}
