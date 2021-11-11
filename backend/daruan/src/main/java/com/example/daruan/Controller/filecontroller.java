package com.example.daruan.Controller;

import com.example.daruan.Services.Impl.UserImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@CrossOrigin
@Controller
public class filecontroller {
    @Autowired
    UserImpl service;

    @PostMapping(value = "/uploadavatar")
    @ResponseBody
    public JsonNode uploadImages(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        Integer userid = 0;
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        ObjectNode result = new ObjectMapper().createObjectNode();
        if (file.isEmpty()) {
            result.put("msg","文件不存在");
            return result;
        }

        String fileName = file.getOriginalFilename();  // 文件名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));  // 后缀名
        String filePath = "//home//lighthouse//daruan//files//image//"; // 上传后的路径,即本地磁盘
        fileName = UUID.randomUUID() + suffixName; // 新文件名
        File dest = new File(filePath + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String filename = "/temp/" + fileName;//本地目录和生成的文件名拼接，这一段存入数据库

        service.updateavatar(userid,filename);
        result.put("code",0);
        result.put("msg","上传成功");
        result.put("imgUrl",filename);
        return result;
    }

    @Configuration
    public class MyWebAppConfigurer implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            //外部访问路径映射到本地磁盘路径
            registry.addResourceHandler("/temp/**").addResourceLocations("file:files//image//");
        }
    }
}
