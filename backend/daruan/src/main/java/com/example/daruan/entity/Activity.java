package com.example.daruan.entity;

public class Activity {
    Integer id;
    String title;
    String site;
    Integer number_people;
    String deadline;
    String introduction;
    Integer organizer;
    Integer like;
    Integer hate;
    String type;
    String time_start;
    String time_duration;

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

    public Integer getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Integer organizer) {
        this.organizer = organizer;
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

    public String getTime_duration() {
        return time_duration;
    }

    public void setTime_duration(String time_duration) {
        this.time_duration = time_duration;
    }
}
