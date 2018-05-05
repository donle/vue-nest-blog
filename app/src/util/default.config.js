export const isDevMode = () => webpackHotUpdate ? true : false;
export const requestDOM = isDevMode() ? 'http://localhost:3000/' : '/';