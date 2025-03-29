package com.org.mitra.transaction;

import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.charity.CharityOrganizationService;
import com.org.mitra.user.User;
import com.org.mitra.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.math.BigDecimal;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final CharityOrganizationService charityOrganizationService;
    public TransactionService(TransactionRepository transactionRepository, UserService userService, CharityOrganizationService charityOrganizationService) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.charityOrganizationService = charityOrganizationService;
    }

    // Make a Transaction
    public Transaction makeTransaction(Transaction transaction) {
        User user = userService.getUserByEmail(transaction.getUser().getEmail());
        CharityOrganization charity = charityOrganizationService.getCharityById(transaction.getCharity().getId());
        transaction.setUser(user);
        transaction.setCharity(charity);
        return transactionRepository.save(transaction);
    }

    // Get all Transaction
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }


    public Page<Transaction> getTransactionsByUserId(Long id, Pageable pageable) {
        User user = userService.getUserById(id);
        return transactionRepository.findByUser(user, pageable);
    }

    public Page<Transaction> getTransactionsByUserEmail(String email, Pageable pageable) {
        User user = userService.getUserByEmail(email);
        return transactionRepository.findByUser(user, pageable);
    }

    public Page<Transaction> getTransactionsByCharityId(Long id, Pageable pageable) {
        CharityOrganization charity = charityOrganizationService.getCharityById(id);
        return transactionRepository.findByCharity(charity, pageable);
    }
    public Page<Transaction> getTransactionsByCharityEmail(String email, Pageable pageable) {
        CharityOrganization charity = charityOrganizationService.getCharityByEmail(email);
        return transactionRepository.findByCharity(charity, pageable);
    }
    // Get paginated and sorted transactions
    public Page<Transaction> getTransactions(Pageable pageable) {
        return transactionRepository.findAll(pageable);
    }


    // Get total sum of transactions by user ID
    public BigDecimal getTotalTransactionsByUserId(Long userId) {
        User user = userService.getUserById(userId);
        return transactionRepository.findByUser(user)
                .stream()
                .map(transaction -> BigDecimal.valueOf(transaction.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Get total sum of transactions by user ID and charity ID
    public BigDecimal getTotalTransactionsByUserIdAndCharityId(Long userId, Long charityId) {
        User user = userService.getUserById(userId);
        CharityOrganization charity = charityOrganizationService.getCharityById(charityId);
        return transactionRepository.findByUserAndCharity(user, charity)
                .stream()
                .map(transaction -> BigDecimal.valueOf(transaction.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    // Get total sum of transactions by charity ID
    public BigDecimal getTotalTransactionsByCharityId(Long charityId) {
        CharityOrganization charity = charityOrganizationService.getCharityById(charityId);
        return transactionRepository.findByCharity(charity)
                .stream()
                .map(transaction -> BigDecimal.valueOf(transaction.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    // Get total sum of transactions by charity ID and user ID
    public BigDecimal getTotalTransactionsByCharityIdAndUserId(Long charityId, Long userId) {
        CharityOrganization charity = charityOrganizationService.getCharityById(charityId);
        User user = userService.getUserById(userId);
        return transactionRepository.findByCharityAndUser(charity, user)
                .stream()
                .map(transaction -> BigDecimal.valueOf(transaction.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    //get users by charity ID:
    public List<User> getUsersByCharityId(Long charityId) {
        return transactionRepository.findUsersByCharityId(charityId);
    }
}
