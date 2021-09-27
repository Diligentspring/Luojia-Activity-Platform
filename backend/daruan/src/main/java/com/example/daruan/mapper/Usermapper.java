package com.example.daruan.mapper;

import com.example.daruan.entity.User;
public interface Usermapper {
    int createuser(User user);
    User getUserInfoByAccount(String username);
    User getUserInfoByid(int userid);
}
