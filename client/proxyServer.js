const proxy = require('http-proxy-middleware').createProxyMiddleware;
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('./index.html', { cache: false });
const app = express();

app.use(
    proxy('/api', {
        target: 'http://localhost:5000'
    })
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));