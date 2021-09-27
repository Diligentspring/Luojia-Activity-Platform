package com.example.daruan.tools;

import com.example.daruan.Services.Impl.UserImpl;
import com.example.daruan.entity.User;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 未登录拦截器
 */
@Component
public class LoginInterceptor<LoginDao> implements HandlerInterceptor {

    @Autowired
    private UserImpl service;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 获得cookie
        Cookie[] cookies = request.getCookies();
        // 没有cookie信息，则重定向到登录界面
        if (null == cookies) {
            response.sendRedirect(request.getContextPath() + "/login");
            return false;
        }
        // 定义cookie_username，用户的一些登录信息，例如：用户名，密码等
        int cookie_userid = 0;
        // 获取cookie里面的一些用户信息
        for (Cookie item : cookies) {
            if ("cookie_userid".equals(item.getName())) {
                cookie_userid = Integer.parseInt(item.getValue());
                break;
            }
        }
        // 如果cookie里面没有包含用户的一些登录信息，则重定向到登录界面
        if (StringUtils.isEmpty(cookie_userid)) {
            response.sendRedirect(request.getContextPath() + "/login");
            return false;
        }
        // 获取HttpSession对象
        HttpSession session = request.getSession();
        // 获取我们登录后存在session中的用户信息，如果为空，表示session已经过期
        Object obj = session.getAttribute("user_session");
        if (null == obj) {
            // 根据用户登录账号获取数据库中的用户信息
            User dbUser = service.getUserInfoByid(cookie_userid);
            // 将用户保存到session中
            session.setAttribute("user_session", dbUser);
        }
        // 已经登录
        return true;
    }
}

