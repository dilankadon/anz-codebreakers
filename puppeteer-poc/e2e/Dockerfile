FROM zenato/puppeteer

USER root
#FROM dcregistry.service.dev:5000/base/node/puppeteer:8.9.4-test

ADD . /e2e

RUN cp -rf node_modules/puppeteer/.local-chromium/linux-564778/ e2e/node_modules/puppeteer/.local-chromium/
RUN rm -rf e2e/node_modules/puppeteer/.local-chromium/mac-564778

ENV NPM_CONFIG_REGISTRY=https://artifactory.service.anz/artifactory/api/npm/cd-online-npmorg \
    NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /e2e
# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
