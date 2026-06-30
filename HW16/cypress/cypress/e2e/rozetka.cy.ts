import { RozetkaPage } from '../pages/rozetka.page';

describe('Rozetka UI Elements Interaction Tests (Cypress)', (): void => {
    let rozetkaPage: RozetkaPage;

    beforeEach((): void => {
        cy.viewport(1920, 1080);
        rozetkaPage = new RozetkaPage();
        rozetkaPage.goTo();
    });

    it('should navigate to Rozetka store locations page', (): void => {
        rozetkaPage.storesLink.click();
        cy.url().should('match', /.*\/retail\/.*/);
        rozetkaPage.storesHeader.should('be.visible').and('contain.text', 'Магазини ROZETKA');
    });

    it('should open product category menu', (): void => {
        rozetkaPage.catalogBtn.click();
        rozetkaPage.laptopCategoryLink.click();
        rozetkaPage.heading.should('be.visible').and('have.text', 'Комп\'ютери та ноутбуки');
    });
});
