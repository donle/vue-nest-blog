export const isDevMode = () => typeof webpackHotUpdate !== 'undefined' ? true : false;
export const requestDOM = isDevMode() ? 'http://localhost:3000/' : '/';