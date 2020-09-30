import '../../../support';

describe('Login page:', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    context('Account login', () => {
        it('should log in user', () => {
            // get element attribute by this order: data-test-id, id, name
            // step 1 of 2
            cy.get('input[data-test-id="text-login_email_user"]').type(`saul@domain.com`, { timeout: 500 });
            cy.get('input[data-test-id="text-login_password"]').type('asdasd');
            cy.get('button[name="commit"]').click();
            cy.wait(2000)
            cy.url()
                .should('eq', `${Cypress.config().baseUrl}dashboard`);
        });
    });
});