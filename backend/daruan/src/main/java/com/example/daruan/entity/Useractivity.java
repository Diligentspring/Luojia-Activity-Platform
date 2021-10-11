package com.example.daruan.entity;

import io.swagger.models.auth.In;

public class Useractivity{
	Integer userid;
	Integer actid;
	Integer role; //0代表参与者，1代表组织者
	
	public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
    
    
    
    public Integer getActid() {
		return actid;
	}

	public void setActid(Integer actid) {
		this.actid = actid;
	}

	public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}