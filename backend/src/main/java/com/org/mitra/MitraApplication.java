package com.org.mitra;

import com.org.mitra.admin.Admin;
import com.org.mitra.admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class MitraApplication implements CommandLineRunner {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(MitraApplication.class, args);
	}

	@Override
	public void run(String... args) {
		Optional<Admin> existingAdmin = adminRepository.findByEmail("admin@mitra.com");
		if (existingAdmin.isEmpty()) { // Admin doesn't exist, insert new
			Admin admin = new Admin();
			admin.setName("Super Admin");
			admin.setEmail("admin@mitra.com");
			admin.setPassword(passwordEncoder.encode("Admin@2025"));
			adminRepository.save(admin);
			System.out.println("Admin user added.");
		} else {
			System.out.println("Admin already exists.");
		}
	}
}
