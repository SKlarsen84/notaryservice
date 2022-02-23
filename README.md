# Concordium blockchain notary extension

## _Notarize and verify file integrity_

Open source chrome extension that lets you notarize/verify any file directly from your browser.
All file hashes are generated locally and stored on the concordium blockchain.

## Features

- Drag/drop any file to the extension to notarize its SHA(256) checksum on the Concordium blockchain
- Drag/drop any file to the extension to check whether it has been notarized on the Concordium blockchain at any point
- Includes nodeJS/Express backend for hosting your own backend endpoint

## Tech

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Concordium node SDK](https://github.com/Concordium/concordium-node-sdk-js/) - Concordium for Node
- [React/Typescript Chrome Extension Boilerplate](https://github.com/martellaj/chrome-extension-react-typescript-boilerplate)

## Chrome extension:

##### Building

2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode - we recommend using nvm and setting your node version to 14.13.10, as 16.13.10 seems to have problems compiling the extension. Additionally, if you're using an M1 mac you may need to run from a x86 enabled terminal.
4.  `npm run build` to build a production (minified) version

##### Installation

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo
4.  Having installed the extension, go to addon details -> preferences and set the notary endpoint to your notary service backend (e.g http://127.0.0.1:3000/notaryService)

## Express backend:

##### Building

1.  create an .env file with the following variables:

- `SENDER_ACCOUNT` - the address to perform the registerData transaction which notarizes the file.
- `ACCOUNT_SIGN_KEY` - signkey for the sender account
- `PORT` - port you wish to run the backend on
- `NODE_ADDRESS` - ip/hostname of the machine running your concordium node . E.g. 'concordiumwalletnode.com'

The SignKey can be found by exporting your wallet, decrypting it via Concordiums official auxilliary tools (https://developer.concordium.software/en/mainnet/net/references/developer-tools.html) and locating the SignKey value for your chosen account. _Note that this will expose your wallet keys during use, so act accordingly and exercise due dilligence_ 2. `npm i` 3. `npm run start` to start

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[ace editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
[pldb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[plgh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[plgd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
