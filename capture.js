const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Set viewport to a standard desktop size
        await page.setViewport({ width: 1440, height: 900 });

        console.log("Navigating to Wix site...");
        await page.goto('https://girishkumarsamal29.wixstudio.com/portfolio', { waitUntil: 'networkidle2' });
        
        // Wait a bit for any initial animations
        await new Promise(r => setTimeout(r, 3000));
        
        // Take full page screenshot
        await page.screenshot({ path: 'wix-portfolio-full.png', fullPage: true });
        console.log("Wix screenshot saved to wix-portfolio-full.png");

        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
