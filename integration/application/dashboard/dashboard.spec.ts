import '../../../support';

describe('Dashboard page:', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    context('Dashboard', () => {
        it('should log in', () => {
            cy.get('input[data-test-id="text-login_email_user"]').type(`saul@domain.com`, { timeout: 500 });
            cy.get('input[data-test-id="text-login_password"]').type('asdasd');
            cy.get('button[name="commit"]').click();
            cy.wait(1000);

            cy.get('div[data-test-id="newest-members-nearby"] .menu-wrapper').should('have.css', 'overflow', 'hidden')
              .find('.menu-item-wrapper').its('length').should('be.lessThan', 10);

            cy.get('div[data-test-id="newest-members-nearby"]')
              .find('div[data-test-id="data-member-username"]').should('exist');

            cy.get('div[data-test-id="newest-members-nearby"]')
              .find('div[data-test-id="data-member-age-city"]').should('exist');

            cy.get('div[data-test-id="newest-members-nearby"]')
              .find('div[data-test-id="data-member-photo-count"]').should('exist');

            cy.get('div[data-test-id="members-recently-online"] .menu-item-wrapper').its('length').should('be.lessThan', 10);

            cy.get('div[data-test-id="newest-members-nearby"]')
              .find('.data-avatar-image-url').should('have.css', 'background-image').and('match', /820px/);
        });

    });
});