package com.example.daruan.entity;

import io.swagger.models.auth.In;

import java.util.List;

public class Activity {
    Integer id;
    String title;
    String site;
    Integer number_people;
    String deadline; //结束报名时间
    String introduction;
    Integer organizerid;
    Integer like;
    Integer hate;
	String type;
    String time_start; //活动开始时间
    String time_end;  //活动结束时间
    String start; //开始报名时间
    Integer state;
    Integer already_register;
    Integer participated = 0; //0表示不参与，1表示参与
    String organizer;
    Integer like_this = 0; //0表示不喜欢，1表示喜欢
    Integer hate_this = 0; //0表示不讨厌，1表示讨厌
    String icon;
    List<User> participator;

    public String getOrganizer() {
		return organizer;
	}

	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}

	public Integer getLike_this() {
		return like_this;
	}

	public void setLike_this(Integer like_this) {
		this.like_this = like_this;
	}

	public Integer getHate_this() {
		return hate_this;
	}

	public void setHate_this(Integer hate_this) {
		this.hate_this = hate_this;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Integer getParticipated() {
		return participated;
	}

	public void setParticipated(Integer participated) {
		this.participated = participated;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public Integer getNumber_people() {
        return number_people;
    }

    public void setNumber_people(Integer number_people) {
        this.number_people = number_people;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public Integer getOrganizerid() {
        return organizerid;
    }

    public void setOrganizerid(Integer organizerid) {
        this.organizerid = organizerid;
    }

    public Integer getLike() {
		return like;
	}

	public void setLike(Integer like) {
		this.like = like;
	}

	public Integer getHate() {
		return hate;
	}

	public void setHate(Integer hate) {
		this.hate = hate;
	}
    
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTime_start() {
        return time_start;
    }

    public void setTime_start(String time_start) {
        this.time_start = time_start;
    }

    public String getTime_end() {
        return time_end;
    }

    public void setTime_end(String time_end) {
        this.time_end = time_end;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getAlready_register() {
        return already_register;
    }

    public void setAlready_register(Integer already_register) {
        this.already_register = already_register;
    }

    public List<User> getParticipator() {
        return participator;
    }

    public void setParticipator(List<User> participator) {
        this.participator = participator;
    }
}
