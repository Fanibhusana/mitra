package com.org.mitra.transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.org.mitra.charity.CharityOrganization;
import com.org.mitra.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface TransactionRepository extends JpaRepository<Transaction, Long>, PagingAndSortingRepository<Transaction, Long>  {

    Page<Transaction> findByUser(User user, Pageable pageable);
    Page<Transaction> findByCharity(CharityOrganization charity, Pageable pageable);
    List<Transaction> findByUser(User user);
    List<Transaction> findByUserAndCharity(User user, CharityOrganization charity);
    List<Transaction> findByCharity(CharityOrganization charity);
    List<Transaction> findByCharityAndUser(CharityOrganization charity, User user);
    @Query("SELECT DISTINCT t.user FROM Transaction t WHERE t.charity.id = :charityId")
    List<User> findUsersByCharityId(@Param("charityId") Long charityId);
}

