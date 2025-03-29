package com.org.mitra.security;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private String email;
    private List<String> roles;


    public LoginResponse(String email, List<String> roles, String token) {
        this.email = email;
        this.roles = roles;
        this.token = token;
    }
}
