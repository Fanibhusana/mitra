package com.org.mitra.admin;

import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.transaction.Transaction;
import com.org.mitra.user.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    //Get All Users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

   // Delete a User
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }

    //Get All Charities
    @GetMapping("/charities")
    public ResponseEntity<List<CharityOrganization>> getAllCharities() {
        return ResponseEntity.ok(adminService.getAllCharities());
    }

   // Delete a Charity
    @DeleteMapping("/charities/{id}")
    public ResponseEntity<String> deleteCharity(@PathVariable Long id) {
        adminService.deleteCharity(id);
        return ResponseEntity.ok("Charity deleted successfully.");
    }

   // Get All Transactions (Donations)
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(adminService.getAllTransactions());
    }

    //Register a New Admin
    @PostMapping("/register")
    public ResponseEntity<Admin> registerAdmin( @RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.registerAdmin(admin));
    }
   // Find Admin by Email
    @GetMapping
    public ResponseEntity<Optional<Admin>> findAdminByEmail(@RequestParam String email) {
        return ResponseEntity.ok(adminService.findAdminByEmail(email));
    }
    // get Admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> findAdminById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminById(id));
    }
    //update Admin by id
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @Valid @RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.updateAdmin(id, admin));
    }

    //update user by id
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        return ResponseEntity.ok(adminService.updateUser(id, user));
    }
    //update charity by id
    @PutMapping("/charities/{id}")
    public ResponseEntity<CharityOrganization> updateCharity(@PathVariable Long id, @Valid @RequestBody CharityOrganization charity) {
        return ResponseEntity.ok(adminService.updateCharity(id, charity));
    }

    // Get total sum of transactions received by a charity email
    @GetMapping("/charity/{email}/total-sum")
    public ResponseEntity<BigDecimal> getTotalTransactionsReceivedByCharity(@PathVariable String email) {
        BigDecimal totalSum = adminService.getTotalTransactionsByCharity(email);
        return ResponseEntity.ok(totalSum);
    }

    // Get total sum of transactions given by a user email
    @GetMapping("/user/{email}/total-sum")
    public ResponseEntity<BigDecimal> getTotalTransactionsGivenByUser(@PathVariable String email) {
        BigDecimal totalSum = adminService.getTotalTransactionsByUser(email);
        return ResponseEntity.ok(totalSum);
    }
}
