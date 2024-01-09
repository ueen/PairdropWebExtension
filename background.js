let pairdrop;

let pdURL = "https://pairdrop.net";

const popupModes = {
  Winpop: 'winpop',
  Tab: 'tab',
  Sidebar: 'sidebar'
}

let popupMode;

browser.storage.sync.get({SdAmode:"", Backg:false, Servr:"https://pairdrop.net"}).then(function (result) {
	pdURL = result.Servr;

	popupMode = result.SdAmode;
	switch (result.SdAmode) {
		case popupModes.Sidebar:
			popupListener();
			sidebarInit();
		case popupModes.Winpop:
		case popupModes.Tab:
			browser.action.onClicked.addListener(actionClick);
			break;
		default: //classic popup
			browser.action.setPopup({popup: 'popup/popup.html'});
			popupListener();
			break;
	}

	if (result.Backg) {
		pairdrop = new Pairdrop(pdURL.split("//")[1]);
		browser.tabs.onUpdated.addListener(handleUpdated);
		browser.tabs.onRemoved.addListener(handleRemoved);
	}
});

browser.runtime.onMessage.addListener(action => {
	switch (action) {
		case "reload":
			browser.runtime.reload();
			break;
		case "sidebarClick":
			sidebarListener();
			break;
	}
});

function popupListener() {
	browser.runtime.onConnect.addListener(function(port) {
				if (port.name === "popup") {
					stop();
					port.onDisconnect.addListener(_ => restart());
				}
			});
}

function sidebarListener() {
	browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message === "sidebarClick") {
			browser.tabs.query({active: true}).then(tabs => {
				sendResponse(tabs[0].url);
			});
		}
		return true;
	});
}

function sidebarInit() {
	try {
  	browser.contentScripts.register({
		    matches: [pdURL+'/*'],
		    js: [{file: "browser-polyfill.js"}, {file: "popup/sidebar.js"}],
		    allFrames : true,
		    runAt: "document_idle"
		  });
	} catch (error) {
	  console.log(error);
	}
}


function actionClick() { //only if not 'classic' Popup Mode
	if (popupMode == popupModes.Sidebar) {
		browser.sidebarAction.open(); //requieres direct user input handle
	} else {
		browser.tabs.query({url: "*://*."+pdURL.split("//")[1]+"/*"}).then( tabs => {
			if (tabs.length <= 0) {
				switch (popupMode) {
					case popupModes.Winpop:
						browser.windows.create({
						    url: pdURL,
						    type: "popup",
						    height: 480,
						    width: 360
						});
						break;
					case popupModes.Tab:
						browser.tabs.create({url: pdURL});
						break;
					case popupModes.Sidebar:
						
						break;
				}
			} else {
				browser.tabs.update(tabs[0].id, {
				    active: true
				 });
				browser.windows.update(tabs[0].windowId, {focused:true})
			}
		});
	}
}


//handle pairdrop opened in tab 
var sdTab;

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (tabInfo.url.includes(pdURL.split("//")[1])) {
  		stop();
  		sdTab = tabId;
  } else if (tabId == sdTab) {
  		restart();
  }
}

function handleRemoved(tabId, removeInfo) {
  if (sdTab && tabId == sdTab) {
  		restart();
  }
}

function restart() {
	if (pairdrop) {
		pairdrop.server.restart();
  		console.log('background pairdrop restarted');
	}
}
function stop() {
	if (pairdrop) {
		pairdrop.server.stop(); 
	  	console.log('background pairdrop stopped'); 
	}
}
