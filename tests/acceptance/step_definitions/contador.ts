import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "./config/custom-world";
import { expect } from "playwright/test";

Given('el usuario visita el home del sitio', async function (this: ICustomWorld) {
    const page = this.page!;
    await page.goto('http://localhost:5173/home');
})

When('el usuario hace click en el boton +', async function (this: ICustomWorld) {
    const page = this.page!;
    const boton = await page.locator('[data-testid="increase"]');
    await expect(boton).toBeVisible();
    await boton.click();
})

Then('el usuario ve el contador incrementarse en una unidad.', async function (this: ICustomWorld) {
    const page = this.page!;
    const contador = await page.locator('[data-testid="counter-text"]');
    await expect(contador).toHaveText('Count: 1');
})

When('el usuario hace click en el boton -', async function (this: ICustomWorld) {
    const page = this.page!;
    const boton = await page.locator('[data-testid="decrease"]');
    await expect(boton).toBeVisible();
    await boton.click();
})

Then('el usuario ve el contador decrementar en una unidad.', async function (this: ICustomWorld) {
    const page = this.page!;
    const contador = await page.locator('[data-testid="counter-text"]');
    await expect(contador).toHaveText('Count: 0');
})