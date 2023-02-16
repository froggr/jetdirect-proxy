// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const net = require('net');

const server = net.createServer();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jetdirect-proxy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	//// "onCommand:jetdirect-proxy.startServer"
	let disposable = vscode.commands.registerCommand('jetdirect-proxy.startServer', function () {
		// The code you place here will be executed every time your command is executed
		

		// Display a message box to the user
		vscode.window.showInformationMessage('🏎️ Jetdirect Proxy Started! 🏎️');
	});

	context.subscriptions.push(disposable);


	let PORT = 9001;
		let HOST = '127.0.0.1';
		server.listen(PORT, HOST);
	
		let sockets= [];
		console.log('listening');
		vscode.window.showInformationMessage('🖨️ Jetdirect Proxy Started! (9001->9100)');
		server.on('connection', function(sock) {
		
			sock.setEncoding('utf8');
			console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
			sockets.push(sock);

			sock.on('data', function(data) {

				const client = net.connect({port: 9100, address: 'localhost' }, () => {
					// 'connect' listener
					
					console.log('Redirecting to printer!');
					client.write(data);
					client.end();
					vscode.window.showInformationMessage('Print Job Proxied!');
				});

				client.on('end', () => {
					console.log('disconnected from server');
				});

			});

			// Add a 'close' event handler to this instance of socket
			sock.on('close', function(data) {
				let index = sockets.findIndex(function(o) {
					return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
				})
				if (index !== -1) {
					sockets.splice(index, 1);
				}
				console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
			});
		});


}

// This method is called when your extension is deactivated
function deactivate() {
	server.close();
}

module.exports = {
	activate,
	deactivate
}
