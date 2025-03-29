package com.org.mitra.security;

import com.org.mitra.admin.Admin;
import com.org.mitra.admin.AdminRepository;
import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.charity.CharityOrganizationRepository;
import com.org.mitra.user.User;
import com.org.mitra.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CharityOrganizationRepository charityOrganizationRepository;
    private final AdminRepository adminRepository;

    public CustomUserDetailsService(UserRepository userRepository, CharityOrganizationRepository charityOrganizationRepository, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.charityOrganizationRepository = charityOrganizationRepository;
        this.adminRepository = adminRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) return user.get();

        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) return admin.get();

        Optional<CharityOrganization> org = charityOrganizationRepository.findByEmail(email);
        if (org.isPresent()) return org.get();

        throw new UsernameNotFoundException("User not found: " + email);
    }
}
