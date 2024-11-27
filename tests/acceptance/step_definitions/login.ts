import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "./config/custom-world";
import { expect } from "@playwright/test";

Given('Navego a la pagina de login', async function (this: ICustomWorld) {
    const page = this.page!;
    await page.goto('https://www.saucedemo.com/');
});

Given("Ingreso el nombre de usuario {string}", async function (this: ICustomWorld, username: string) {
    const page = this.page!;
    await page.fill('#user-name', username);
});

Given("Ingreso el password {string}", async function (this: ICustomWorld, password: string) {
    const page = this.page!;
    await page.fill('#password', password);
});

When('hago click en el boton de login', async function (this: ICustomWorld) {
    const page = this.page!;
    await page.locator("#login-button").click();
});

Then('Se me hara navegar a la pagina de inventario.', async function (this: ICustomWorld) {
    const page = this.page!;
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
});