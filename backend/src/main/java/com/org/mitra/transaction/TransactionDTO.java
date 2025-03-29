package com.org.mitra.transaction;

import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.user.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TransactionDTO {
    // Getters
    private final Long id;
    private final Long amount;
    private final String status;
    private final LocalDateTime timestamp;
    private final String charityName;
    private final String userName;
    // Constructor
    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.amount = transaction.getAmount();
        this.status = transaction.getStatus();
        this.timestamp = transaction.getTimestamp();
        CharityOrganization charity = transaction.getCharity();
        this.charityName = (charity != null) ? charity.getName() : "Unknown Charity";
        User user= transaction.getUser();
        this.userName = (user != null) ? user.getName() : "Unknown User";
    }

}
