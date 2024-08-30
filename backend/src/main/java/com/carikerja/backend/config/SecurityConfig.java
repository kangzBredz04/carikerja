package com.carikerja.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, RequestFilter requestFilter) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    // Public routes
                    auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-up").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-in").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/api/jobs").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/api/employers").permitAll();

                    // // Authenticated routes
                    // auth.requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated();
                    // auth.requestMatchers(HttpMethod.POST, "/api/auth/sign-out").authenticated();
                    // auth.requestMatchers(HttpMethod.GET, "/api/education").authenticated();
                    // auth.requestMatchers(HttpMethod.GET, "/api/work-experience").authenticated();
                    // auth.requestMatchers(HttpMethod.GET,
                    // "/api/organizational-experience").authenticated();
                    // auth.requestMatchers(HttpMethod.GET, "/api/notifications").authenticated();

                    // // Routes for admin only
                    // auth.requestMatchers(HttpMethod.POST, "/api/employers").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.PUT, "/api/employers/{id}").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.DELETE,
                    // "/api/employers/{id}").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.POST, "/api/jobs").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.PUT, "/api/jobs/{id}").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.DELETE, "/api/jobs/{id}").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.POST, "/api/notifications").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.PUT,
                    // "/api/notifications/{id}").hasRole("ADMIN");
                    // auth.requestMatchers(HttpMethod.DELETE,
                    // "/api/notifications/{id}").hasRole("ADMIN");

                    // // Routes for job seekers only
                    // auth.requestMatchers(HttpMethod.POST,
                    // "/api/job-seekers").hasRole("JOB_SEEKER");
                    // auth.requestMatchers(HttpMethod.PUT,
                    // "/api/job-seekers/{id}").hasRole("JOB_SEEKER");
                    // auth.requestMatchers(HttpMethod.POST,
                    // "/api/applications").hasRole("JOB_SEEKER");
                    // auth.requestMatchers(HttpMethod.PUT,
                    // "/api/applications/{id}").hasRole("JOB_SEEKER");
                    // auth.requestMatchers(HttpMethod.POST,
                    // "/api/interviews").hasRole("JOB_SEEKER");
                    // auth.requestMatchers(HttpMethod.PUT,
                    // "/api/interviews/{id}").hasRole("JOB_SEEKER");

                    // // Routes for employers only
                    // auth.requestMatchers(HttpMethod.POST, "/api/employers").hasRole("EMPLOYER");
                    // auth.requestMatchers(HttpMethod.PUT,
                    // "/api/employers/{id}").hasRole("EMPLOYER");
                    // auth.requestMatchers(HttpMethod.POST, "/api/jobs").hasRole("EMPLOYER");
                    // auth.requestMatchers(HttpMethod.PUT, "/api/jobs/{id}").hasRole("EMPLOYER");

                    // Any other request requires authentication
                    auth.anyRequest().permitAll();
                })
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
