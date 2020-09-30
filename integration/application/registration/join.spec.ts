import '../../../support';

describe('Join page:', () => {
    beforeEach(() => {
        cy.visit('/join');
    });

    Cypress.Commands.add('submitStep1', (id) => {
        cy.get('input[data-test-id="text-email"]').type(`qa+cymg_${id}@incube8.sg`, {timeout: 500});
        cy.get('input[data-test-id="text-password"]').type('Info!Stream');
        cy.get('button[name="commit"]').click();
    })

    context('Successful complete registration', () => {
        // Gets element attribute by this order: data-test-id, id, name
        it('should sign up as Generous male', () => {
            const id = Math.random().toString(36)
                .replace(/[^a-z]+/g, '').substr(0, 5);
            // Step 1 of 2
            cy.submitStep1(id);

            // Step 2 of 2
            cy.url().should('eq', `${Cypress.config().baseUrl}join`);
            cy.get('input[data-test-id="radio-sex-1"]').click({force: true});
            cy.get('input[data-test-id="radio-account_type-1"]').should('have.value', 1);
            cy.get('input[data-test-id="radio-interested_in-2"]').click({force: true});
            cy.get('input[data-test-id="text-username"]').type(`CYFG${id}`);
            cy.get('input[data-test-id="text-location"]').type('Singapore')
                .wait(1000)
                .parent()
                .parent()
                .next()
                .next()
                .click();

            cy.get('select[id="month"]').select('5');
            cy.get('select[id="day"]').select('25');
            cy.get('select[id="year"]').select('1986');
            cy.get('button[data-test-id="button-continue"]').click();

            // Redirects to profile/edit
            cy.wait(1000);
            cy.url().should('eq', `${Cypress.config().baseUrl}profile/edit?userFirstTimeLogin=1`);
        });

        it('should sign up as Attractive male', () => {
            const id = Math.random().toString(36)
                .replace(/[^a-z]+/g, '').substr(0, 5);
            // Step 1 of 2
            cy.submitStep1(id);

            // Step 2 of 2
            cy.url().should('eq', `${Cypress.config().baseUrl}join`);
            cy.get('input[data-test-id="radio-sex-2"]').click({force: true});
            cy.get('input[data-test-id="radio-account_type-2"]').should('have.value', 2);
            cy.get('input[data-test-id="radio-interested_in-1"]').click({force: true});
            cy.get('input[data-test-id="text-username"]').type(`CYFA${id}`);
            cy.get('input[data-test-id="text-location"]').type('Singapore')
                .wait(1000)
                .parent()
                .parent()
                .next()
                .next()
                .click();
            cy.get('select[id="month"]').select('5');
            cy.get('select[id="day"]').select('25');
            cy.get('select[id="year"]').select('1986');
            cy.get('button[data-test-id="button-continue"]').should('be.enabled').click();

            // Redirects to profile/edit
            cy.wait(1000);
            cy.url().should('eq', `${Cypress.config().baseUrl}profile/edit?userFirstTimeLogin=1`);
        });
    });

    context('Registration step 1 validation', () => {
        Cypress.Commands.add('submitStep1Validation', (emailType, passwordType) => {
            cy.get('button[name="commit"]').click();

            if (emailType === 'empty' && passwordType === 'empty') {
                cy.get('form').contains('Invalid email/password combination.');
            } else if (emailType === 'invalid' && passwordType === 'valid') {
                cy.get('form').contains('Please use a valid email address.');
                cy.get('form').contains('This is an invalid email address.');
            } else if (emailType === 'suggested' && passwordType === 'valid') {
                cy.get('form').contains('Did you mean lvberonio+cy@gmail.com?');
                cy.get('form').contains('This is an invalid email address.');
            } else if (emailType === 'valid' && passwordType === 'minimum') {
                cy.get('form').contains('The password must be at least 8 characters.');
            } else if (emailType === 'valid' && passwordType === 'common') {
                cy.get('form').contains('This password is very common. Please use a different one.');
            }
        })

        it('should validate empty email and password', () => {
            cy.submitStep1Validation('empty', 'empty');
        });

        it('should validate invalid email and correct password', () => {
            cy.get('input[data-test-id="text-email"]').type(`lvberonio+cy`, { timeout: 500 });
            cy.get('input[data-test-id="text-password"]').type('Info!Stream');
            cy.submitStep1Validation('invalid', 'valid');
        });

        it('should validate invalid email and correct password', () => {
            cy.get('input[data-test-id="text-email"]').type(`lvberonio+cy@`, { timeout: 500 });
            cy.get('input[data-test-id="text-password"]').type('Info!Stream');
            cy.submitStep1Validation('invalid', 'valid');
        });

        it('should validate invalid email and correct password', () => {
            cy.get('input[data-test-id="text-email"]').type(`lvberonio+cy@gmail`, { timeout: 500 });
            cy.get('input[data-test-id="text-password"]').type('Info!Stream');
            cy.submitStep1Validation('suggested', 'valid');
        });

        it('should validate valid email and minimum password', () => {
            cy.get('input[data-test-id="text-email"]').type(`lvberonio+cy@gmail`, { timeout: 500 });
            cy.get('input[data-test-id="text-password"]').type('Info');
            cy.submitStep1Validation('valid', 'minimum');
        });

        it('should validate valid email and common password', () => {
            cy.get('input[data-test-id="text-email"]').type(`lvberonio+cy@gmail`, { timeout: 500 });
            cy.get('input[data-test-id="text-password"]').type('Password');
            cy.submitStep1Validation('valid', 'common');
        });

        it('should validate hide and show password', () => {
            cy.get('input[data-test-id="text-email"]').type(`lvberonio+cy@gmail`, { timeout: 500 });
            cy.get('input[data-test-id="text-password"]').type('Info!Stream');
            cy.get('form').contains('Show password').click();
            cy.get('input[data-test-id="text-password"]').should('have.value', 'Info!Stream')
            cy.get('form').contains('Hide password').click();
            cy.get('input[data-test-id="text-password"]')
                .invoke('attr', 'type').should('equal', 'password')
        });
    });

    context('Registration step 2 validation', () => {
        // Gets element attribute by this order: data-test-id, id, name
        beforeEach(() => {
            const id = Math.random().toString(36)
                .replace(/[^a-z]+/g, '').substr(0, 5);
            // Step 1 of 2
            cy.submitStep1(id);
        });

        it('should validate Continue when no values', () => {
            cy.get('form[id="signup"]').contains('Continue').should('be.disabled')
        });

        it('should validate characters of username', () => {
            cy.get('input[data-test-id="text-username"]').type('lee@').blur();
            cy.get('form[id="signup"]').contains('Your username cannot have any special characters or spaces.');
        });

        it('should validate length of username', () => {
            cy.get('input[data-test-id="text-username"]').type('lv').blur();
            cy.get('form[id="signup"]').contains('Display name must be 3 to 14 characters long.');
            cy.get('input[data-test-id="text-username"]').type('mrleevanberonio').blur();
            cy.get('form[id="signup"]').contains('Display name must be 3 to 14 characters long.');
        });

        it('should validate location', () => {
            cy.get('input[data-test-id="text-location"]').focus().blur();
            cy.get('form[id="signup"]').contains('You must select a location.');
        });

        it('should validate birthdate', () => {
            let year = (new Date()).getFullYear()

            cy.get('input[data-test-id="radio-sex-2"]').click({force: true});
            cy.get('input[data-test-id="radio-account_type-2"]').should('have.value', 2);
            cy.get('input[data-test-id="radio-interested_in-1"]').click({force: true});
            cy.get('input[data-test-id="text-username"]').type('lee');
            cy.get('input[data-test-id="text-location"]').type('Singapore')
                .wait(1000)
                .parent()
                .parent()
                .next()
                .next()
                .click();
            cy.get('select[id="month"]').select('5');
            cy.get('select[id="day"]').select('25');
            cy.get('select[id="year"]').select((year - 14).toString());
            cy.get('form[id="signup"]').contains('Age must be 18 years old and above.');

            cy.get('button[data-test-id="button-continue"]').click();
            cy.get('div[class="common_error_content"]')
                .contains('There was an error submitting the form. Please try again.');
        });
    });
});