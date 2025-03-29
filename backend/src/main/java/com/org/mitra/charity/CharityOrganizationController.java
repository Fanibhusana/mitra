package com.org.mitra.charity;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/charities")
public class CharityOrganizationController {
    private final CharityOrganizationService charityService;

    public CharityOrganizationController(CharityOrganizationService charityService) {
        this.charityService = charityService;
    }

    // Register a new charity organization
   @PostMapping("/register")
    public ResponseEntity<CharityOrganization> createCharity(@Valid @RequestBody CharityOrganization charity) {
        CharityOrganization savedCharity = charityService.createCharity(charity);
        return ResponseEntity.ok(savedCharity);
    }

    // Get charity by ID
    @GetMapping("/{id}")
    public ResponseEntity<CharityOrganization> getCharityById(@PathVariable Long id) {
        CharityOrganization charity = charityService.getCharityById(id);
        return ResponseEntity.ok(charity);
    }
    // Get charity by email
    @GetMapping("/email/{email}")
    public ResponseEntity<CharityOrganization> getCharityByEmail(@PathVariable String email) {
        CharityOrganization charity = charityService.getCharityByEmail(email);
        return ResponseEntity.ok(charity);
    }

   // Get all charities
    @GetMapping
    public ResponseEntity<List<CharityOrganization>> getAllCharities() {
        List<CharityOrganization> charities = charityService.getAllCharities();
        return ResponseEntity.ok(charities);
    }

  //  Delete a charity organization
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCharity(@PathVariable Long id) {
        charityService.deleteCharity(id);
            return ResponseEntity.ok("Charity organization deleted successfully");
    }
    // Update a charity organization
    @PutMapping("/update/{id}")
    public ResponseEntity<CharityOrganization> updateCharity(@PathVariable Long id, @Valid @RequestBody CharityOrganization charity) {
        CharityOrganization updatedCharity = charityService.updateCharity(id, charity);
        return ResponseEntity.ok(updatedCharity);
    }
//http://localhost:8080/charity/search?city=San+Francisco&state=California&country=USA
    // search by location pageable
@GetMapping("/search")
public ResponseEntity<Page<CharityOrganization>> findByLocation(
        @RequestParam(required = false) String zip,
        @RequestParam(required = false) String city,
        @RequestParam(required = false) String state,
        @RequestParam(required = false) String country,
        @PageableDefault(size = 10) Pageable pageable) {

    // Convert empty strings to null
    zip = (zip != null && zip.isEmpty()) ? null : zip;
    city = (city != null && city.isEmpty()) ? null : city;
    state = (state != null && state.isEmpty()) ? null : state;
    country = (country != null && country.isEmpty()) ? null : country;

    System.out.println("Searching charities with params: " + zip + ", " + city + ", " + state + ", " + country);

    Page<CharityOrganization> charity = charityService.findByLocation(zip, city, state, country, pageable);
    System.out.println("Search result: " + charity);

    return ResponseEntity.ok(charity);
}

    // Get paginated and sorted charities
    @GetMapping("/paginated")
    public ResponseEntity<Page<CharityOrganization>> getCharities(@PageableDefault(size = 10) Pageable pageable) {
        Page<CharityOrganization> charities = charityService.getCharities(pageable);
        return ResponseEntity.ok(charities);
    }


}
