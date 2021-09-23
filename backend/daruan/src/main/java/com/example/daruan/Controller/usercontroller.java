package com.example.daruan.Controller;

import com.example.daruan.Services.Impl.UserImpl;
import com.example.daruan.entity.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class usercontroller {
    @Autowired
    UserImpl service;

    @PostMapping("/newuser")
    public JsonNode newuser(@RequestBody User user){
        ObjectNode result = new ObjectMapper().createObjectNode();
        int status= service.createuser(user);
        result.put("code:",status);
        return result;
    }
}
