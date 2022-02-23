
## Building

1.  Clone repo
2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode - we recommend using nvm and setting your node version to 14.13.10, as 16.13.10 seems to have problems compiling the extension.
4.  `npm run build` to build a production (minified) version

## Installation

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo
