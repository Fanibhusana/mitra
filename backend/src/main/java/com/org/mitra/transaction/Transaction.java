package com.org.mitra.transaction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-transactions")
    private User user;

    @ManyToOne
    @JoinColumn(name = "charity_org_id", nullable = false)
    @JsonBackReference("charity-transactions")
    private CharityOrganization charity;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false)
    private String status; // "PENDING", "SUCCESS", "FAILED"

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}