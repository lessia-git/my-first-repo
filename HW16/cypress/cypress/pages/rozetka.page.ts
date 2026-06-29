export class RozetkaPage {
    public goTo(): void {
        cy.visit('https://rozetka.com.ua', {
            failOnStatusCode: false,
            headers: {
                'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        });
    }

    public get storesLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('a.main-links-link', 'Магазини Rozetka');
    }

    public get storesHeader(): Cypress.Chainable<JQuery<HTMLHeadingElement>> {
        return cy.get('h1');
    }

    public get catalogBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('button[data-testid="fat_menu_btn"]');
    }

    public get laptopCategoryLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains('a[data-testid="fat_menu_category_link"]', 'Ноутбуки та комп’ютери');
    }

    public get heading(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('h1.portal__heading');
    }
}
