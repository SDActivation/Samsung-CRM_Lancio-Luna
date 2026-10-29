import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',use:{baseURL:process.env.PLAYWRIGHT_BASE_URL??'http://127.0.0.1:4173',headless:true},webServer:process.env.PLAYWRIGHT_BASE_URL?undefined:{command:'npm run dev -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:true},reporter:'list'});
