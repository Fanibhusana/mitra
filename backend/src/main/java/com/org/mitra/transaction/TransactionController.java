package com.org.mitra.transaction;

import com.org.mitra.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    //  Make a Transaction
    @PostMapping
    public ResponseEntity<Transaction> makeTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionService.makeTransaction(transaction);
        return ResponseEntity.ok(savedTransaction);
    }

   // Get all transactions (for admin)
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    // Get donations made by a specific user id paginated and sorted
    @GetMapping("/user/{id}")
    public ResponseEntity<Page<TransactionDTO>> getTransactionsByUserId(
            @PathVariable Long id,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<Transaction> transactions = transactionService.getTransactionsByUserId(id, pageable);
        Page<TransactionDTO> transactionDTOs = transactions.map(TransactionDTO::new);
        return ResponseEntity.ok(transactionDTOs);
    }

    //Get donations made by a specific user email paginated and sorted
    @GetMapping("/user/email/{email}")
    public ResponseEntity<Page<TransactionDTO>> getTransactionsByUserEmail(
            @PathVariable String email,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<Transaction> transactions = transactionService.getTransactionsByUserEmail(email, pageable);
        Page<TransactionDTO> transactionDTOs = transactions.map(TransactionDTO::new);
        return ResponseEntity.ok(transactionDTOs);
    }


    //Get all donations for a specific charity id paginated and sorted
    @GetMapping("/charity/{id}")
    public ResponseEntity<Page<TransactionDTO>> getTransactionsByCharityId(
            @PathVariable Long id,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<Transaction> transactions = transactionService.getTransactionsByCharityId(id, pageable);
        Page<TransactionDTO> transactionDTOs = transactions.map(TransactionDTO::new);
        return ResponseEntity.ok(transactionDTOs);
    }
    //Get all donations for a specific charity email paginated and sorted
    @GetMapping("/charity/email/{email}")
    public ResponseEntity<Page<TransactionDTO>> getTransactionsByCharityEmail(
            @PathVariable String email,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<Transaction> transactions = transactionService.getTransactionsByCharityEmail(email, pageable);
        Page<TransactionDTO> transactionDTOs = transactions.map(TransactionDTO::new);
        return ResponseEntity.ok(transactionDTOs);
    }

    // Get paginated and sorted transactions
    @GetMapping("/paginated")
    public ResponseEntity<Page<Transaction>> getTransactions(@PageableDefault(size = 10) Pageable pageable) {
        Page<Transaction> transactions = transactionService.getTransactions(pageable);
        return ResponseEntity.ok(transactions);
    }

    // Get total sum of transactions by user ID
    @GetMapping("/user/{id}/total-sum")
    public ResponseEntity<BigDecimal> getTotalTransactionsByUserId(@PathVariable Long id) {
        BigDecimal totalSum = transactionService.getTotalTransactionsByUserId(id);
        return ResponseEntity.ok(totalSum);
    }

    // Get total sum of transactions by user ID and charity ID
    @GetMapping("/user/{userId}/charity/{charityId}/total-sum")
    public ResponseEntity<BigDecimal> getTotalTransactionsByUserIdAndCharityId(
            @PathVariable Long userId,
            @PathVariable Long charityId) {
        BigDecimal totalSum = transactionService.getTotalTransactionsByUserIdAndCharityId(userId, charityId);
        return ResponseEntity.ok(totalSum);
    }

    // Get total sum of transactions by charity ID
    @GetMapping("/charity/{id}/total-sum")
    public ResponseEntity<BigDecimal> getTotalTransactionsByCharityId(@PathVariable Long id) {
        BigDecimal totalSum = transactionService.getTotalTransactionsByCharityId(id);
        return ResponseEntity.ok(totalSum);
    }

    // Get total sum of transactions by charity ID and user ID
    @GetMapping("/charity/{charityId}/user/{userId}/total-sum")
    public ResponseEntity<BigDecimal> getTotalTransactionsByCharityIdAndUserId(
            @PathVariable Long charityId,
            @PathVariable Long userId) {
        BigDecimal totalSum = transactionService.getTotalTransactionsByCharityIdAndUserId(charityId, userId);
        return ResponseEntity.ok(totalSum);
    }
//fetch users by charity ID
    @GetMapping("/charity/{charityId}/users")
    public ResponseEntity<List<User>> getUsersByCharityId(@PathVariable Long charityId) {
        List<User> users = transactionService.getUsersByCharityId(charityId);
        return ResponseEntity.ok(users);
    }
}


