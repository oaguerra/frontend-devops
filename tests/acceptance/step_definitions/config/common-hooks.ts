import { ICustomWorld } from "./custom-world";
import {
	ChromiumBrowser,
	chromium
} from '@playwright/test'
import { After, AfterAll, Before, BeforeAll, ITestCaseHookParameter, Status } from '@cucumber/cucumber'
import { spawn } from "child_process";
import { readFile } from "fs/promises";

let browser: ChromiumBrowser
let serverProcess;


BeforeAll(async function () {

	serverProcess = spawn('npx', ['vite'], { detached: true, stdio: 'inherit' });
	console.log(`PID del Browser: ${serverProcess.pid}`);
	// Espera a que el servidor esté listo
	await new Promise((resolve) => setTimeout(resolve, 2000)); // ajusta el tiempo según el tiempo de carga de tu app
	browser = await chromium.launch({ headless: true })
});

Before(async function (this: ICustomWorld) {
	this.context = await browser.newContext({
		acceptDownloads: true,
		recordVideo: { dir: 'tests/reports/videos' },
		viewport: { width: 1200, height: 800 }
	});
	this.page = await this.context.newPage();
})

After(async function (this: ICustomWorld) {
	await this.page?.close();
	await this.context?.close()
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
	if (result) {
		if (result.status !== Status.PASSED) {
			const image = await this.page?.screenshot()
			if (image) { (await this.attach(image, 'image/png')) }
		}
	}
	await this.page?.close()
	await this.context?.close()
})

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
	if (result) {
		if (result.status !== Status.PASSED) {
			const videoPath = await this.page!.video()!.path();
            const videoBuffer = await readFile(videoPath); // Lee el video como un Buffer
            const base64Video = videoBuffer.toString('base64'); // Convierte el Buffer a base64

            // Adjunta el video HTML al reporte
            await this.attach(base64Video, 'base64:video/webm');

		} else if (result.status === Status.PASSED) {
			this.page?.video()?.delete()
		}
	}
})

AfterAll(async function () {
	await browser.close()
	if (serverProcess && serverProcess.exitCode === null) {
		console.log('Killing webserver process');
		process.kill(-serverProcess.pid);
	}
	console.log('Webserver process killed and ending all tests');
});

