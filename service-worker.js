"use strict";var precacheConfig=[["/anz-codebreakers/index.html","cf6ea7ef067e56a66b3f79119135283b"],["/anz-codebreakers/static/js/main.7698ad95.js","96c3651567c6ea610f30ad7a78546630"],["/anz-codebreakers/static/media/0-pI3ql0sHFHLiaBetgtyo8umdj4p-6D5xun_OH8-gvff4DygsMWeMJ6Mk6f5Mj.3ba1042e.woff","3ba1042e5313bc934013f72babc57e69"],["/anz-codebreakers/static/media/3r57zimxqwYxOiK6rAJJo0_hI5u0M99BSoSUZ-rqyqvff4zygsMWeMI6MP6f5Mt.7ea13526.otf","7ea1352634ce2207ce8cb1a386b1c209"],["/anz-codebreakers/static/media/65WKTZQgHEwIup1bnFEolFk3g6ZkTRowmUvsCLvWYy6ff4aygsMWeMJ6Mk6f5gM.1a468ccd.woff","1a468ccdccb6a63cb681ec214f4992fc"],["/anz-codebreakers/static/media/6uwRZicYt0M_uruvO0oa6s-9UXxt41rRutzhYyfht56ff4nygsMWeMJ6MP6f5Mb.8fcf5d1e.otf","8fcf5d1ecaa189fb121ac3df8cb7d441"],["/anz-codebreakers/static/media/8MT-09Ql3M_zgrf6mWZPwK_rULkIzovTRjHcUUIqICGff4zygsMWeMJ6MP6f5Mt.7ea13526.otf","7ea1352634ce2207ce8cb1a386b1c209"],["/anz-codebreakers/static/media/CYdsm0gVkV92VumxhGF3g8YC08MkNS-RxnXhYgaeq39ff41ygsMWeMI6MP6f5MX.fd5a1cc1.otf","fd5a1cc107819fd9fc31635d34119eb9"],["/anz-codebreakers/static/media/PVssMel20pic_bBVQYHW3Le4eoTpHc67cTlzeUPJxlSff41ygsMWeMJ6MP6f5MX.fd5a1cc1.otf","fd5a1cc107819fd9fc31635d34119eb9"],["/anz-codebreakers/static/media/RA-57xGUcT3XPQ28zwIrJBVYKYohCB-X-T2RMiI1Dsbff4DygsMWeMJ6MP6f5Mj.7f57329f.otf","7f57329f13540ff83cbd500cfe01ddbd"],["/anz-codebreakers/static/media/US_Navy_Cryptanalytic_Bombe.3a6c1218.jpg","3a6c1218fbf58f1541a0e4a90e6f5eee"],["/anz-codebreakers/static/media/ZZcumRzIrgjZJLIJMMvReD_1jMycOZLlgSSwrEif2_qff4RygsMWeMJ6Mk6f5Mw.9072e650.woff","9072e650c9b4e1dc765ebdaaac305018"],["/anz-codebreakers/static/media/anz-logo.8ad9bb99.svg","8ad9bb9943b55100b8e65acede86943c"],["/anz-codebreakers/static/media/kiFTVGC4SBTmR4xGTqZFI5qluqGlgN8BknKoC2E63Fvff4nygsMWeMI6MP6f5Mb.8fcf5d1e.otf","8fcf5d1ecaa189fb121ac3df8cb7d441"],["/anz-codebreakers/static/media/mY3wKEa1Tgy-dKDRttVBELUhLiXuMm8dzcr-M1d0ICbff4RygsMWeMJ6MP6f5Mw.238b5c2d.otf","238b5c2d4ef5aaee05ce78f25778dacd"],["/anz-codebreakers/static/media/p4ba3Q2eVmoNLjd7gtBGYwHhQ01WXrd6wKJIrLQPYyjff4aygsMWeMI6MP6f5gM.4689d90c.otf","4689d90c6059638e8f0236dbafcadf0b"],["/anz-codebreakers/static/media/pBu9k_xG3fNpKTETN5SWzbhC_HZxvAytHm-aq8RxD39ff41ygsMWeMJ6Mk6f5MX.95a3d10c.woff","95a3d10c753d5e95e1f144638fc146df"],["/anz-codebreakers/static/media/pLY0-faJaFO5oeUmTdttWr9Lv3TzO7WQECK6ACu7ZvJff4nygsMWeMJ6Mk6f5Mb.96e6a076.woff","96e6a07614c621e85972f2a0d3fc66d6"],["/anz-codebreakers/static/media/qrdCwGuscU9w-CmBx0zclOokD_bAgF4djcoIXqZyTvSff4RygsMWeMI6MP6f5Mw.238b5c2d.otf","238b5c2d4ef5aaee05ce78f25778dacd"],["/anz-codebreakers/static/media/quuE_KZZwWiNX7XdwOUwkXL_6_cIkp7bya89uhB8kl6ff4aygsMWeMJ6MP6f5gM.4689d90c.otf","4689d90c6059638e8f0236dbafcadf0b"],["/anz-codebreakers/static/media/u8ORts9oS3ERgCWgqcunNL4xvpAFQCPM9-OW3mEraxwff4zygsMWeMJ6Mk6f5Mt.8ea974b1.woff","8ea974b16459095028a42759387fc02f"],["/anz-codebreakers/static/media/zEIs2q2WTbgs_g3QmZTtM-rujkp4F6LpKRuHZbvFs-wff4DygsMWeMI6MP6f5Mj.7f57329f.otf","7f57329f13540ff83cbd500cfe01ddbd"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var r=new URL(e);return c&&r.pathname.match(c)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),r=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var r="/anz-codebreakers/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});