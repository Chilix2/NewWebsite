import { defineConfig } from '@playwright/test';

const BS_USER = process.env.BROWSERSTACK_USERNAME!;
const BS_KEY  = process.env.BROWSERSTACK_ACCESS_KEY!;

export default defineConfig({
  testDir: './tests',
  workers: 1,

  use: {
    baseURL: process.env.BASE_URL || 'https://www.sailly.de',
  },

  projects: [
    {
      name: 'iOS-Safari-iPhone15Pro',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            'browserName': 'webkit',
            'bstack:options': {
              deviceName: 'iPhone 15 Pro',
              osVersion: '17',
              realMobile: true,
              'browserstack.username': BS_USER,
              'browserstack.accessKey': BS_KEY,
              name: 'iOS-iPhone15Pro',
              build: `sailly-audit-${new Date().toISOString().slice(0,10)}`,
            }
          }))}`,
        }
      }
    },
    {
      name: 'iOS-Safari-iPhoneSE',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            'browserName': 'webkit',
            'bstack:options': {
              deviceName: 'iPhone SE 2022',
              osVersion: '16',
              realMobile: true,
              'browserstack.username': BS_USER,
              'browserstack.accessKey': BS_KEY,
              name: 'iOS-iPhoneSE-smallest',
              build: `sailly-audit-${new Date().toISOString().slice(0,10)}`,
            }
          }))}`,
        }
      }
    },
    {
      name: 'Android-Pixel7',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            'browserName': 'chrome',
            'bstack:options': {
              deviceName: 'Google Pixel 7',
              osVersion: '13.0',
              realMobile: true,
              'browserstack.username': BS_USER,
              'browserstack.accessKey': BS_KEY,
              name: 'Android-Pixel7',
              build: `sailly-audit-${new Date().toISOString().slice(0,10)}`,
            }
          }))}`,
        }
      }
    },
    {
      name: 'Android-SamsungS23',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            'browserName': 'chrome',
            'bstack:options': {
              deviceName: 'Samsung Galaxy S23',
              osVersion: '13.0',
              realMobile: true,
              'browserstack.username': BS_USER,
              'browserstack.accessKey': BS_KEY,
              name: 'Android-SamsungS23',
              build: `sailly-audit-${new Date().toISOString().slice(0,10)}`,
            }
          }))}`,
        }
      }
    },
  ],
});
