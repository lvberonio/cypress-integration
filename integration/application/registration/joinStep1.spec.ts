import '../../../support';

describe('Join page - step 1:', () => {
    beforeEach(() => {
        cy.visit('/join');
    });

    context('Successful email check', () => {
        it('should verify email does not exist and proceed to step 2', () => {
            // get element attribute by this order: data-test-id, id, name
            // step 1 of 2
            cy.get('input[data-test-id="text-email"]').type('qa+generous@incube8.sg');
            cy.get('input[data-test-id="text-password"]').type('Info!Stream');
            cy.get('button[name="commit"]').click();

            // step 2 of 2
            cy.url().should('eq', `${Cypress.config().baseUrl}join`);
            cy.get('input[data-test-id="radio-sex-1"]').click({force: true});
        });
    });
});
