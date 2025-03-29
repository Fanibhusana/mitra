package com.org.mitra.charity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.Optional;

public interface CharityOrganizationRepository extends JpaRepository<CharityOrganization, Long> , PagingAndSortingRepository<CharityOrganization, Long>{
    Optional<CharityOrganization> findByEmail(String email);

    @Query("SELECT u FROM CharityOrganization u WHERE " +
            "(:zip IS NULL OR u.zip = :zip) AND " +
            "(:city IS NULL OR u.city = :city) AND " +
            "(:state IS NULL OR u.state = :state) AND " +
            "(:country IS NULL OR u.country = :country)")
    Page<CharityOrganization> findByLocation(@Param("zip") String zip,
                                             @Param("city") String city,
                                             @Param("state") String state,
                                             @Param("country") String country,
                                             Pageable pageable);


}
