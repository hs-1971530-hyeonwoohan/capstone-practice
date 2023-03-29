package com.passionroad.passionroad.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    /* This is a controller that serves the 'index.html' file, regardless of the address users access for this project. After connecting, react router takes over the page routing functionality.
    * There is only one controller that uses @Controller to handle user connections. The rest of the controllers use @RestController for AJAX(fetch, axios) purposes.
    * */
    @RequestMapping(value = "/**")
    public String index(){
        return "forward:/index.html";
    }
}
