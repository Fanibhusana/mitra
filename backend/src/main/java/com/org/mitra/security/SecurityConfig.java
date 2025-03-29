package com.org.mitra.security;

import com.org.mitra.admin.AdminRepository;
import com.org.mitra.charity.CharityOrganizationRepository;
import com.org.mitra.security.jwt.AuthEntryPointJwt;
import com.org.mitra.security.jwt.AuthTokenFilter;
import com.org.mitra.user.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig{
    private final AuthEntryPointJwt unauthorizedHandler;
    private final UserRepository userRepository;
    private final CharityOrganizationRepository charityOrganizationRepository;
    private final AdminRepository adminRepository;
    public SecurityConfig(AuthEntryPointJwt unauthorizedHandler, UserRepository userRepository, CharityOrganizationRepository charityOrganizationRepository, AdminRepository adminRepository) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.userRepository = userRepository;
        this.charityOrganizationRepository = charityOrganizationRepository;
        this.adminRepository = adminRepository;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    // filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/api/users/register", "/api/charities/register", "/api/signin").permitAll()
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                )
        .httpBasic(withDefaults())
              //  .formLogin(withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(
                session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(authenticationJwtTokenFilter(),
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(unauthorizedHandler));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception
    { return authenticationConfiguration.getAuthenticationManager();}

    @Bean
    public UserDetailsService userDetailsService(){
        return new CustomUserDetailsService(userRepository, charityOrganizationRepository, adminRepository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //  Cross-Origin Resource Sharing
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); // Allow all origins (change this in production)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
