package com.example.daruan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.example.daruan.mapper")
@SpringBootApplication
public class DaruanApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaruanApplication.class, args);
    }

}
