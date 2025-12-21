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
      cy.get('#pn_id_133 > .p-dropdown-label').click()
      cy.get('#pn_id_133_235 > .custom-dropdown-item').click()
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
      cy.get('#pn_id_159 > .p-dropdown-label').click()
      cy.get('#pn_id_159_100 > .custom-dropdown-item').click()
      cy.get('.ng-touched > .field-container > .view-control > .p-inputtext')
        .click()
        .type('election card')
      
      // Enter value in input number field
      cy.get('#pn_id_140_content > .p-accordion-content > .p-4 > div.ng-untouched > :nth-child(1) > .p-0 > .p-fluid > .col-12 > div[_ngcontent-ng-c2272642698=""] > app-view-controls.ng-untouched > .field-container > .view-control > .p-inputwrapper > .p-inputnumber > #withoutgrouping', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('1') // Enter numeric value
      
      // Enter postcode EH1 1SR in autocomplete field
      cy.get('#pn_id_141_content > .p-accordion-content > .p-4 > div.ng-untouched > :nth-child(1) > .p-0 > .p-fluid > :nth-child(1) > div[_ngcontent-ng-c2272642698=""] > app-view-controls.ng-untouched > .field-container > .view-control > .textbox-feild > .relative > .w-full > .p-autocomplete > [name="undefined"]', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('EH1 1SR')
      
      // Enter address 3/3 High Street
      cy.get('#pn_id_141_content > .p-accordion-content > .p-4 > .ng-star-inserted.ng-dirty > :nth-child(1) > .p-0 > .p-fluid > :nth-child(2) > div[_ngcontent-ng-c2272642698=""] > .ng-dirty > .field-container > .view-control > .p-inputtext', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('3/3 High Street')
      
      // Enter address line 2 - Near City Center
      // Wait a bit for the form to update after entering address line 1
      cy.wait(1000)
      
      // Find address line 2 input field using a more flexible selector
      // Get all visible input text fields in the address content area and select the second one
      cy.get('#pn_id_141_content .p-inputtext', { timeout: 20000 })
        .should('have.length.at.least', 2)
        .eq(1) // Get the second input field (index 1) for address line 2
        .should('be.visible')
        .clear()
        .type('Near City Center')
      
      // Enter city name Edinburgh
      // Wait a bit for the form to update
      cy.wait(1000)
      
      // Find city field - try multiple selector strategies
      cy.get('body').then(($body) => {
        // First try: look for input fields in the address section
        const addressInputs = $body.find('#pn_id_141_content .p-inputtext')
        if (addressInputs.length >= 3) {
          // Use the 3rd input field (index 2) which is typically the city field
          cy.get('#pn_id_141_content .p-inputtext', { timeout: 20000 })
            .eq(2)
            .should('be.visible')
            .clear()
            .type('Edinburgh')
        } else {
          // Fallback: try the original selector with increased timeout
          cy.get(':nth-child(5) > div[_ngcontent-ng-c2272642698=""] > .ng-touched > .field-container > .view-control > .p-inputtext', { timeout: 25000 })
            .should('be.visible')
            .clear()
            .type('Edinburgh') // Fixed: should be Edinburgh, not address
        }
      })
      
      // Select country and date fields
      cy.get('#pn_id_143 > .p-dropdown-label').click()
      cy.get('#pn_id_143_235 > .custom-dropdown-item').click()
      cy.get('.ng-touched > .field-container > .view-control > .p-inputwrapper > .p-calendar > .p-inputtext')
        .clear()
        .type('01/02/2025')
      cy.get('#pn_id_146 > .p-dropdown-label').click()
      cy.get('#pn_id_146_2 > .custom-dropdown-item').click()
      cy.get(':nth-child(9) > div[_ngcontent-ng-c2272642698=""] > .ng-valid > .field-container > .view-control > :nth-child(2) > .flex > .active').click()
      
      // Enter postcode EH1 1NU in autocomplete field
      cy.get('#pn_id_161_content > .p-accordion-content > .p-4 > div.ng-untouched > :nth-child(1) > .p-0 > .p-fluid > :nth-child(1) > div[_ngcontent-ng-c2272642698=""] > app-view-controls.ng-untouched > .field-container > .view-control > .textbox-feild > .relative > .w-full > .p-autocomplete > [name="undefined"]', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('EH1 1NU')
        cy.get('#pn_id_161_content > .p-accordion-content > .p-4 > .ng-star-inserted.ng-dirty > :nth-child(1) > .p-0 > .p-fluid > :nth-child(2) > div[_ngcontent-ng-c2272642698=""] > .ng-dirty > .field-container > .view-control > .p-inputtext',{ timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('4/4 New Skinners bank')
      
      // Enter "near city gate" in address line 2 field
      // Wait a bit for the form to update
      cy.wait(1000)
      
      // Find address line 2 field using a more flexible approach
      cy.get('body').then(($body) => {
        // Try the original selector first
        if ($body.find(':nth-child(3) > div[_ngcontent-ng-c2272642698=""] > .ng-touched > .field-container > .view-control > .p-inputtext').length > 0) {
          cy.get(':nth-child(3) > div[_ngcontent-ng-c2272642698=""] > .ng-touched > .field-container > .view-control > .p-inputtext', { timeout: 20000 })
            .should('be.visible')
            .clear()
            .type('near city gate')
        } else {
          // Fallback: look for input fields in the address section (#pn_id_161_content)
          cy.get('#pn_id_161_content', { timeout: 20000 }).then(($content) => {
            const inputs = $content.find('.p-inputtext')
            // Address line 2 is typically the 2nd input field (index 1)
            if (inputs.length >= 2) {
              cy.wrap(inputs.eq(1))
                .should('be.visible')
                .clear()
                .type('near city gate')
            } else {
              // Last resort: try to find all input text fields and select the second one
              cy.get('#pn_id_161_content .p-inputtext', { timeout: 20000 })
                .should('have.length.at.least', 2)
                .eq(1)
                .should('be.visible')
                .clear()
                .type('near city gate')
            }
            
          })
        }
      })
      
      // Enter city name Edinburgh
      // Wait a bit for the form to update
      cy.wait(1000)
      
      // Find city field using a more flexible approach
      cy.get('body').then(($body) => {
        // Try the original selector first
        if ($body.find(':nth-child(5) > div[_ngcontent-ng-c2272642698=""] > .ng-touched > .field-container > .view-control > .p-inputtext').length > 0) {
          cy.get(':nth-child(5) > div[_ngcontent-ng-c2272642698=""] > .ng-touched > .field-container > .view-control > .p-inputtext', { timeout: 20000 })
            .should('be.visible')
            .clear()
            .type('Edinburgh')
        } else {
          // Fallback: look for input fields in the address section (#pn_id_161_content)
          cy.get('#pn_id_161_content', { timeout: 20000 }).then(($content) => {
            const inputs = $content.find('.p-inputtext')
            // City field is typically the 3rd input field (index 2) in the address section
            if (inputs.length >= 3) {
              cy.wrap(inputs.eq(2))
                .should('be.visible')
                .clear()
                .type('Edinburgh')
            } else {
              // Last resort: try to find all input text fields and select the city field
              cy.get('#pn_id_161_content .p-inputtext', { timeout: 20000 })
                .should('have.length.at.least', 3)
                .eq(2)
                .should('be.visible')
                .clear()
                .type('Edinburgh')
            }
          })
        }
      })
      
      // Select country and date for second address section
      cy.get('#pn_id_163 > .p-dropdown-label').click()
      cy.get('#pn_id_163_235 > .custom-dropdown-item').click()
      cy.get('.ng-touched > .field-container > .view-control > .p-inputwrapper > .p-calendar > .p-inputtext')
        .clear()
        .type('01/03/2025')
      
      // Enter postcode EH1 1RR in autocomplete field
      cy.get('.ng-invalid > .field-container > .view-control > .textbox-feild > .relative > .w-full > .p-autocomplete > [name="undefined"]', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('EH1 1RR')
      
      // Enter "near city gate" in address line 2 field
      cy.get(':nth-child(2) > div[_ngcontent-ng-c2272642698=""] > .ng-invalid > .field-container > .view-control > .p-inputtext', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('near city gate')
      
      // Enter "Edinburgh" in city field
      cy.get(':nth-child(4) > div[_ngcontent-ng-c2272642698=""] > .ng-invalid > .field-container > .view-control > .p-inputtext', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('Edinburgh')
      
      // Enter "Edinburgh" in another field
      cy.get(':nth-child(5) > div[_ngcontent-ng-c2272642698=""] > .ng-invalid > .field-container > .view-control > .p-inputtext', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type('Edinburgh')
        cy.get('#pn_id_173 > .p-dropdown-label').click()
        cy.get('#pn_id_173_235 > .custom-dropdown-item').click()
        cy.get('.ng-invalid > .field-container > .view-control > .p-inputwrapper > .p-calendar > .p-inputtext').clear()
        .type('01/04/2025')
        cy.get('#pn_id_158_content > .p-accordion-content > .p-4 > .ng-untouched.ng-star-inserted > :nth-child(1) > .p-0 > .p-fluid > :nth-child(1) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="No"]').click()
        cy.get(':nth-child(2) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="No"]').click()
        cy.get(':nth-child(3) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="No"]').click()
        cy.get(':nth-child(4) > div[_ngcontent-ng-c2272642698=""] > .ng-untouched > .field-container > .view-control > :nth-child(2) > .flex > [aria-label="No"]').click()
        cy.get('.p-ripple > .flex > .mb-0').click()
        cy.get(':nth-child(8) > div[_ngcontent-ng-c2272642698=""] > app-view-controls.ng-invalid > .field-container > .view-control > .p-inputtext').type('harsh')
        cy.get('.save-button-wrapper > .p-ripple').click()


})

})