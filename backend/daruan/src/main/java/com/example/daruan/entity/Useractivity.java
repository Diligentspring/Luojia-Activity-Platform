package com.example.daruan.entity;

import io.swagger.models.auth.In;

public class Useractivity{
	Integer id;
	Integer userid;
	Integer actid;
	
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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


}