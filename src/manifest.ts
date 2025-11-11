import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
    name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
    description: packageData.description,
    version: packageData.version,
    manifest_version: 3,
    icons: {
        16: 'img/logo-16.png',
        32: 'img/logo-32.png',
        48: 'img/logo-48.png',
        128: 'img/logo-128.png',
    },
    action: {
        default_popup: 'popup.html',
        default_icon: {
            48: 'img/logo-48.png',
        },
    },
    content_scripts: [
        {
            matches: ['*://*.gupy.io/*'],
            js: ['src/contentScript/index.ts'],
            run_at: 'document_start',
        },
    ],
    web_accessible_resources: [
        {
            resources: [
                'img/logo-16.png',
                'img/logo-32.png',
                'img/logo-48.png',
                'img/logo-128.png',
                'src/contentScript/inject/application/interceptor.js',
            ],
            matches: ['*://*.gupy.io/*'],
        },
    ],
    permissions: ['webRequest', 'webRequestBlocking', 'storage'],
    host_permissions: ['*://*.gupy.io/*'],
})
