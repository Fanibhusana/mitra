package com.org.mitra.admin;

import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.charity.CharityOrganizationService;
import com.org.mitra.exception.UserNotFoundException;
import com.org.mitra.transaction.Transaction;
import com.org.mitra.transaction.TransactionService;
import com.org.mitra.user.User;
import com.org.mitra.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final UserService userService;
    private final CharityOrganizationService charityOrganizationService;
    private final TransactionService transactionService;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, UserService userService, CharityOrganizationService charityOrganizationService, TransactionService transactionService, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.userService = userService;
        this.charityOrganizationService = charityOrganizationService;
        this.transactionService = transactionService;
        this.passwordEncoder = passwordEncoder;
    }

    //View All Users
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //Delete a User
    public void deleteUser(Long id) {
         userService.deleteUser(id);
    }

  //  View All Charity Organizations
    public List<CharityOrganization> getAllCharities() {
        return charityOrganizationService.getAllCharities();
    }

   // Delete a Charity Organization
    public void deleteCharity(Long id) {
        charityOrganizationService.deleteCharity(id);
    }
   // View All Transactions
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

   // Register a New Admin
    public Admin registerAdmin(Admin admin) {
        String password = admin.getPassword();
        admin.setPassword(passwordEncoder.encode(password));
        return adminRepository.save(admin);
    }
    // Find Admin by Email
    public Optional<Admin> findAdminByEmail(String email) {
       return adminRepository.findByEmail(email);
    }
    // Update Admin
    public Admin updateAdmin(Long id, Admin admin) {
        Admin existingAdmin = getAdminById(id);
        existingAdmin.setEmail(admin.getEmail());
        existingAdmin.setName(admin.getName());
        existingAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(existingAdmin);
    }

    // update user
    public User updateUser(Long id, User user) {
        return userService.updateUser(id, user);
    }

    // update charity
    public CharityOrganization updateCharity(Long id, CharityOrganization charity) {
        return charityOrganizationService.updateCharity(id, charity);
    }

    // Get user by ID
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Admin with ID " + id + " not found"));
    }

    // Get total sum of transactions by user email
    public BigDecimal getTotalTransactionsByUser(String email){
        return transactionService.getTotalTransactionsByUserId(userService.getUserByEmail(email).getId());
    }

    // Get total sum of transactions by charity email
    public BigDecimal getTotalTransactionsByCharity(String email){
        return transactionService.getTotalTransactionsByCharityId(charityOrganizationService.getCharityByEmail(email).getId());
    }

}
