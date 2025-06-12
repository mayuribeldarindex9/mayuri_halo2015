export class BusSearchPage {

  // Visit the bus booking website
  visit() {
    cy.visit('https://www.bus.irctc.co.in');
    cy.reload(true); // Reload the page (like fresh start)
  }

  // To Clear cookies and local storage
  clearStorage() {
    cy.clearCookies();
    cy.clearLocalStorage();
  }

  // To Select source city from autosuggest
  selectSourceCity(typeText, selectText) {
    cy.get('#departFrom').type(typeText, { delay: 100 });

    // To Wait for suggestions to appear
    cy.get('.ui-menu-item').should('be.visible');

    // To Loop through options and click the matching one
    cy.get('.ui-menu-item').each(($el) => {
      if ($el.text().trim() === selectText) {
        cy.wrap($el).click();
        return false;
      }
    });
  }

  //To Select destination city from autosuggest
  selectDestinationCity(typeText, selectText) {
    cy.get('#goingTo').type(typeText, { delay: 100 });

    cy.get('.ui-menu-item').should('be.visible');

    cy.get('.ui-menu-item').each(($el) => {
      if ($el.text().trim() === selectText) {
        cy.wrap($el).click();
        return false;
      }
    });
  }

  // To Select date from calendar
  selectDate(day, monthName, year) {
    cy.get('#departDate').click();
    cy.get('#ui-datepicker-div').should('be.visible');

    // Month list to convert names to the numbers
    const monthList = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const targetMonthIndex = monthList.indexOf(monthName);

    cy.get('.ui-datepicker-title').then(($title) => {
      const [currentMonth, currentYear] = $title.text().trim().split(' ');
      const currentMonthIndex = monthList.indexOf(currentMonth);
      const currentYearNum = parseInt(currentYear);

      const monthsToMove = (year - currentYearNum) * 12 + (targetMonthIndex - currentMonthIndex);

      // To Click the "Next" button needed number of times
      for (let i = 0; i < monthsToMove; i++) {
        cy.get('.ui-datepicker-next').click();
        cy.wait(200);
      }

      // To Click on the day
      cy.get('.ui-datepicker-calendar td a').contains(day).click();
    });

    // To Confirm the day is selected in input box
    cy.get('#departDate').should('contain.value', day.toString());
    cy.get('button[type="submit"]').eq(2).click()
    cy.pause()
  }
}
