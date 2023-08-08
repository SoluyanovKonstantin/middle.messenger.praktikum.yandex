/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<div id="app"></div>', {
    url: 'http://localhost:5173'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.HTMLElement = window.HTMLElement;

// require.extensions['.hbs'] = function (module, filename) {
//   const contents = fs.readFileSync(filename, 'utf-8');

//   module.exports = Handlebars.compile(contents);
// }

require.extensions['.html'] = function () {
    module.exports = () => ({default: 'dddd'});
};

require.extensions['.css'] = function () {
    module.exports = () => ({});
};

require.extensions['.html?inline'] = function () {
    module.exports = () => ({default: 'dddd'});
};
