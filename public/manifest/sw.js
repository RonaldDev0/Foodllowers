if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>n(e,i),r={module:{uri:i},exports:c,require:o};s[i]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(t(...e),c)))}}define(["./workbox-8637ed29"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/NOkEo96AeDW5GXPZ0BdVx/_buildManifest.js",revision:"486f1982fe6b96f4fa32417a630c02d7"},{url:"/_next/static/NOkEo96AeDW5GXPZ0BdVx/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/111-92dd171acc3e7c39.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/302-b2b885e1de70fb02.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/430-c7b55cbbddd61635.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/622-c1aa4472989ecfbc.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/%5Binfluencer%5D/page-abce0d08fafd5ca1.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/adresses/page-4d30aa713af266fa.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/currentshipment/page-146c1dd9fc016ab3.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/layout-eec56af0e9ced581.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/login/page-a4567fccd8d8d865.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/page-c889943eefd73b6f.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/paymentmethods/page-7f5cfe00869b4ffb.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/profile/page-ec5c1116c0a020f5.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/app/shipments/page-d594cdddeffd7ba3.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/c96ca04b-3a7bc154694fd4fd.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/main-4afc5f6f67c9c878.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/main-app-fc88e087d633e1ea.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/pages/_app-849b901c8e1be66d.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/pages/_error-0b8b23c881c2550d.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-3f1627316d0a8d37.js",revision:"NOkEo96AeDW5GXPZ0BdVx"},{url:"/_next/static/css/98b53bb1d9a39519.css",revision:"98b53bb1d9a39519"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
