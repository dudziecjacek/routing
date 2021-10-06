describe('Home Page', () => {
  beforeEach(() => {
    // simulating http response
    cy.fixture('courses.json').as('coursesJSON'); // initializes data from .json file
    cy.server(); // initializes cypress mock server
    cy.route('/api/courses', '@coursesJSON').as('courses'); // coursesJSON will be sent back
    cy.visit('/');
  })

  it('should display a list of courses', () => {
    cy.contains('All Courses');
    cy.wait('@courses'); // waits for request to finish
    cy.get('mat-card').should('have.length', 9)

    // there's a welcome header on about page
    cy.visit('/about');
    cy.contains('Welcome!');
  })

  it('should display the advanced courses', () => {
    cy.get('.mat-tab-label').should('have.length', 2); // there are 2 tabs

    cy.get('.mat-tab-label').last().click(); // click on last .mat-tab-label
    // cy.contains('Advanced').click(); // #2 way

    cy.get('mat-card').should('have.length', 3) // there should be 3 advanced courses
    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1); // should be more than 1 course be.gt => be greater than
    cy.get('.mat-tab-body-active .mat-card-title').first()
      .should('contain', 'Angular Security Course');
  });
});