package com.example.daruan.Services.Impl;

import com.example.daruan.Services.Userservice;
import com.example.daruan.entity.User;
import com.example.daruan.mapper.Usermapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserImpl implements Userservice {
    @Resource
    private com.example.daruan.mapper.Usermapper Usermapper;
    @Override
    public int createuser(User user){
        return Usermapper.createuser(user);
    }
}
