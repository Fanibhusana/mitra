package com.org.mitra.charity;

import com.org.mitra.exception.CharityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharityOrganizationService {
    private final CharityOrganizationRepository charityRepository;
    private final PasswordEncoder passwordEncoder;

    public CharityOrganizationService(CharityOrganizationRepository charityRepository, PasswordEncoder passwordEncoder) {
        this.charityRepository = charityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new charity
    public CharityOrganization createCharity(CharityOrganization charity) {
        String password = charity.getPassword();
        charity.setPassword(passwordEncoder.encode(password));
        return charityRepository.save(charity);
    }

    // Get all charities
    public List<CharityOrganization> getAllCharities() {
        return charityRepository.findAll();
    }

    // Get charity by ID
    public CharityOrganization getCharityById(Long id) {
        return charityRepository.findById(id).orElseThrow(() -> new CharityNotFoundException("Charity with ID " + id + " not found"));
    }
    // Get charity by email
    public CharityOrganization getCharityByEmail(String email) {
        return charityRepository.findByEmail(email).orElseThrow(() -> new CharityNotFoundException("Charity with email " + email + " not found"));
    }
    // Delete charity by ID
    @PreAuthorize("hasAuthority('ORG') or hasAuthority('ADMIN')")
    public void deleteCharity(Long id) {
        getCharityById(id);
        charityRepository.deleteById(id);
    }
    // Update charity by ID
    @PreAuthorize("hasAuthority('ORG') or hasAuthority('ADMIN')")
    public CharityOrganization updateCharity(Long id, CharityOrganization charity) {
        CharityOrganization existingCharity = getCharityById(id);
        existingCharity.setEmail(charity.getEmail());
        existingCharity.setName(charity.getName());
        existingCharity.setDescription(charity.getDescription());
        existingCharity.setContact(charity.getContact());
        existingCharity.setCountry(charity.getCountry());
        existingCharity.setState(charity.getState());
        existingCharity.setCity(charity.getCity());
        existingCharity.setZip(charity.getZip());
        existingCharity.setPassword(passwordEncoder.encode(charity.getPassword()));

        return charityRepository.save(existingCharity);
    }

    // Get charity by zip or city or state or country with pagination and sorting
    public Page<CharityOrganization> findByLocation(String zip, String city, String state, String country, Pageable pageable) {
        return charityRepository.findByLocation(zip, city, state, country, pageable);
    }


    // Get paginated and sorted charities
    public Page<CharityOrganization> getCharities(Pageable pageable) {
        return charityRepository.findAll(pageable);
    }
}
