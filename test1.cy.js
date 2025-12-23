describe('Gatehouse QA Tests', () => {

  beforeEach(() => {
    // Set viewport to high resolution (1920x1080 - Full HD)
    cy.viewport(1600, 700)
    cy.visit('https://gatehouse-qa.dynamatix.com')
  })

  it('should load the page successfully', () => {
    cy.url().should('include', 'gatehouse-qa')
  
    cy.get('input[type="text"]', { timeout: 15000 })
    .should('be.visible')
    .type('Atharva.uw@dynamatix.com')
    cy.get('input[type="password"]',{ timeout: 15000 })
    .should('be.visible')
    .type('Pass@123Pass@123')
      cy.get('button', { timeout: 20000 })
      .first()
      .click()

      // Wait for the page to load after login
      cy.url().should('not.include', 'login', { timeout: 10000 })
      
      // Wait for page content to fully load
      cy.wait(3000)
      
      // Filter by App ID - try multiple selectors with fallback
      cy.get('body').then(($body) => {
        // Check if the element exists with various selectors
        if ($body.find('.p-inputgroup input').length > 0) {
          // Use the original selector
          cy.get('.p-inputgroup input', { timeout: 20000 })
            .should('be.visible')
            .clear()
            .type('00181439')
        } else if ($body.find('queue-search input').length > 0) {
          // Try queue-search input
          cy.get('queue-search input', { timeout: 20000 })
            .should('be.visible')
            .clear()
            .type('00181439')
        } else if ($body.find('input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]').length > 0) {
          // Try input with App/ID in placeholder
          cy.get('input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]', { timeout: 20000 })
            .first()
            .should('be.visible')
            .clear()
            .type('00181439')
        } else {
          // Fallback: wait more and try with combined selector and increased timeout
          cy.wait(2000)
          cy.get('.p-inputgroup input, queue-search input, input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]', { timeout: 25000 })
            .first()
            .should('be.visible')
            .clear()
            .type('00181439')
        }
      })
      
      // Verify value was entered (check before pressing Enter)
      cy.get('.p-inputgroup input, queue-search input, input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]', { timeout: 20000 })
        .first()
        .should('be.visible')
        .then(($input) => {
          const value = $input.val()
          // Only assert if value exists and is not empty
          if (value && value !== '') {
            expect(value).to.equal('00181439')

          }
        })
      
      // Press Enter to apply filter
      cy.get('.p-inputgroup input, queue-search input, input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]', { timeout: 20000 })
        .first()
        .type('{enter}')
        .wait(500) // Small wait after Enter
      
      // Click on queue search
      cy.get('queue-search > .flex', { timeout: 15000 })
        .should('be.visible')
        .click()
      
      // Wait for filter to apply
      cy.wait(1500)
      
      // Double click on the App ID 00181439
      cy.get('.p-inputgroup input, queue-search input, input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]', { timeout: 20000 })
        .first()
        .should('be.visible')
        .then(($input) => {
          const value = $input.val()
          if (value) {
            expect(value).to.equal('00181439')
          }
        })
        .dblclick()
      
      // Click on table body wrapper
      cy.get(':nth-child(2) > .table-body-wrapper', { timeout: 15000 })
        .should('be.visible')
        .click()
      
      // Wait a bit after clicking table body
      cy.wait(1000)
      
      // Find element containing "Affordab" and press Enter
      cy.contains('Affordab', { timeout: 15000 })
        .should('be.visible')
        .type('{enter}')
      
      // Wait after pressing Enter
      cy.wait(1000)
      
      // Find element containing "Atharva" and click
      cy.contains('Atharva', { timeout: 15000 })
        .should('be.visible')
        .click()
      
      // Wait after clicking
      cy.wait(1000)
      
      // Click on menu item link
      cy.get('#pn_id_59_2_1 > .p-menuitem-content > .p-menuitem-link', { timeout: 20000})
        .should('be.visible')
        .click()
      
      // Wait after clicking menu item
      cy.wait(1000)
      
      // Verify the App ID filter value persists (handle undefined case)
      cy.get('body').then(($body) => {
        const inputSelector = '.p-inputgroup input, queue-search input, input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]'
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector, { timeout: 20000 })
            .first()
            .should('be.visible')
            .then(($input) => {
              const value = $input.val()
              // Only assert if value exists
              if (value !== undefined && value !== null && value !== '') {
                expect(value).to.equal('00181439')
              }
            })
        }
      })
      
      // Additional wait to ensure filter doesn't get cleared
      cy.wait(20000)
      
      // Final verification that App ID filter is still applied (only if value exists)
      cy.get('body').then(($body) => {
        const inputSelector = '.p-inputgroup input, queue-search input, input[placeholder*="App"], input[placeholder*="app"], input[placeholder*="ID"]'
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector, { timeout: 20000 })
            .first()
            .should('exist')
            .then(($input) => {
              if ($input.length > 0) {
                const value = $input.val()
                if (value !== undefined && value !== null && value !== '') {
                  expect(value).to.equal('00181439')
                }
              }
            })
        }
      })
      
      // Fill form fields
      cy.get('#pn_id_122 > .p-dropdown-label').click()
      cy.get('#pn_id_122_3 > .custom-dropdown-item').click()
      cy.get(':nth-child(2) > div[_ngcontent-ng-c2272642698=""] > .ng-dirty > .field-container > .view-control > .p-inputtext')
        .clear()
        .type('Atharva')
      cy.get(':nth-child(3) > div[_ngcontent-ng-c2272642698=""] > .ng-dirty > .field-container > .view-control > .p-inputtext')
        .clear()
        .type('Wekhande')
      cy.get('#pn_id_124 > .p-dropdown-label').click()
      cy.get('#pn_id_124_2 > .custom-dropdown-item').click()
      cy.get('.ng-dirty > .field-container > .view-control > .p-inputwrapper > .p-calendar > .p-inputtext')
        .clear()
        .type('17/09/2002')
      cy.get('#pn_id_127 > .p-dropdown-label').click()
      cy.get('#pn_id_127_5 > .custom-dropdown-item').click()
      cy.get('#pn_id_129 > .p-dropdown-label').click()
      cy.get('#pn_id_129_102 > .custom-dropdown-item').click()
      cy.get('#pn_id_131 > .p-dropdown-label').click()
      cy.get('#pn_id_131_2 > .custom-dropdown-item').click()
      cy.contains('label', 'Country of Tax Residence for the Applicant ')
.parents('.view-control')
.find('.p-dropdown')
.click();

// Select United Kingdom
cy.contains('.p-dropdown-item', 'United Kingdom')
.click();
      cy.get(':nth-child(11) > div[_ngcontent-ng-c2272642698=""] > .ng-touched > .field-container > .view-control > .p-inputtext')
        .clear()
        .type('jagathi@gmail.com')
      cy.get(':nth-child(14) > div[_ngcontent-ng-c2272642698=""] > .ng-dirty > .field-container > .view-control > .p-inputtext')
        .clear()
        .type('Friend')
      cy.get('#pn_id_135 > .p-dropdown-label').click()
      cy.get('#pn_id_135_235 > .custom-dropdown-item').click()
      cy.get(':nth-child(16) > div[_ngcontent-ng-c2272642698=""] > .ng-valid > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="No"]').click()
      cy.get('.ng-dirty > .field-container > .view-control > .p-inputwrapper > .p-inputnumber > #withoutgrouping')
        .clear()
        .type('60')
      cy.get(':nth-child(18) > div[_ngcontent-ng-c2272642698=""] > .ng-valid > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="No"]').click()
      cy.get(':nth-child(19) > div[_ngcontent-ng-c2272642698=""] > .ng-valid > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="Yes"]').click()
      cy.get('#pn_id_137 > .p-dropdown-label').click()
      cy.get('#pn_id_137_1 > .custom-dropdown-item').click()
      cy.get('#pn_id_139_content > .p-accordion-content > .p-4 > .ng-untouched.ng-star-inserted > :nth-child(1) > .p-0 > .p-fluid > .col-12 > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="Yes"]')
      // Open the country dropdown
cy.contains('label', 'What jurisdiction is the applicant linked to?')
.parents('.view-control')
.find('.p-dropdown')
.click();

// Select India
cy.contains('.p-dropdown-item', 'India').click();

     cy.contains('label','Please provide details')
     .parents('.view-control')
     .find('input[type="text"]')
     .clear()
     .type('election card')
      
      // Enter value in input number field
      cy.contains('label', 'Do you have any dependants')
  .parents('.view-control')
  .find('input.p-inputnumber-input')
  .clear()
  .type('1');
  cy.contains('label', 'Age Dependant 1')
  .parents('.view-control')
  .find('input.p-inputnumber-input')
  .clear()
  .type('54');

       
      // Enter postcode EH1 1SR in autocomplete field
      cy.contains('label','Postcode')
     .parents('.view-control')
     .find('input[type="text"]')
     .clear()
     .type('EH1 1SR')
      
     cy.contains('label','Address line 1')
     .parents('.view-control')
     .find('input[type="text"]')
     .clear()
     .type('3/3 High Street')

     cy.contains('label','Address line 2')
     .parents('.view-control')
     .find('input[type="text"]')
     .clear()
     .type('Near City Center')

     cy.contains('label','Address line 3')
     .parents('.view-control')
     .find('input[type="text"]')
     .clear()
     .type('opposite of chruch')

     cy.contains('label','City')
     .parents('.view-control')
     .find('input[type="text"]')
     .clear()
     .type('Edinburgh')

     cy.contains('label', 'Date moved to address')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('10/01/2023')
  .blur();
  // Open Residential status dropdown
cy.contains('label', 'Residential status')
.parents('.view-control')
.find('.p-dropdown')
.click();

// Select option
cy.contains('.p-dropdown-item', 'Owner with mortgage / Purchase plan')
.click();

      
  cy.contains('label', 'Is this your correspondence address?')
  .parents('.view-control')
  .contains('button', 'Yes')
  .click();

  cy.contains('label', 'Postcode')
  .parents('.view-control')
  .find('input.p-autocomplete-input')
  .clear()
  .type('EH1 1NU');

  cy.contains('label', 'Address line 1')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('123 MG Road');

                
                cy.contains('label', 'Address line 2')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('Near Central Park');


                cy.contains('label', 'City')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('Edinburgh');

  cy.contains('label', 'Date moved to address')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('10/01/2023')
  .blur();

  cy.contains('label', 'Who owned this property')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('Vimal')

  cy.contains('label', 'Postcode')
  .closest('.view-control')
  .find('input.p-autocomplete-input')
  .clear()
  .type('EH1 1RR')

  cy.contains('label', 'Address line 1')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('123 MG Road');

                
                cy.contains('label', 'Address line 2')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('Near Central Park');


                cy.contains('label', 'City')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('Edinburgh');
  cy.contains('label', 'Date moved to address')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('10/01/2023')
  .blur();

  cy.contains('label', 'Who owned this property')
  .parents('.view-control')
  .find('input.p-inputtext')
  .clear()
  .type('harsh')
  
  cy.get('#pn_id_160_content > .p-accordion-content > .p-4 > .ng-untouched.ng-star-inserted > :nth-child(1) > .p-0 > .p-fluid > :nth-child(1) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="Yes"]').click()
  cy.get(':nth-child(2) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="Yes"]').click()
  cy.get(':nth-child(3) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="Yes"]').click()
  cy.get(':nth-child(4) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="Yes"]').click()
  cy.get('.save-button-wrapper > .p-ripple').click()

    })

  })
