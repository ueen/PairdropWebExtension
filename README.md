# Pairdrop Web Extension (Addon) - BETA
Share files between devices in your local network.

## Description
By default, this addon just displays a <b>popup</b> with the <a href="https://pairdrop.net/" target="_blank">Pairdrop</a> website so you can start recieving files and texts easily. In the popup the URL of the current tab is posted to the Message Dialog (right click).
You can change the mode in the addons settings either to 'Popup in new window' or 'Open Tab instead' or 'Open in Sidebar'.

<b>Background mode</b>
<br>
<i>can be enabled in the settings</i>
<br>
This runs <a href="https://pairdrop.net/" target="_blank">Pairdrop</a> in the background so you can receive files/texts anytime and get notifications.

<b>Server</b>
<br>
The URL can be specified in the settings, protocol required (http/https)

ATTENTION:
make sure that <a href="https://pairdrop.net/" target="_blank">Pairdrop</a> is only running once.
(The background service will stop running if <a href="https://pairdrop.net/" target="_blank">Pairdrop</a> is opened in any tab, just make sure not to open <a href="https://pairdrop.net/" target="_blank">Pairdrop</a> in several tabs)

#### Kown issue
Firefox: sending files from the popup does not work (FilePicker causes the Popup to close), this is a <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1292701" target="_blank">known bug</a>. Therefore I recommend changing the Mode in the addons settings either to 'Popup in new window' or 'Open Tab instead' or 'Open in Sidebar'.
</br>
Chrome: <a href="https://github.com/ueen/SnapdropFirefoxAddon/issues/23" target="_blank">Unrecognized manifest key 'browser_specific_settings'</a>

## Install
current version: <a href="https://github.com/ueen/PairdropWebExtension/releases/latest" target="_blank"><b>0.1</b></a>

### Firefox
//TODO
<!-- <a href="https://addons.mozilla.org/de/firefox/addon/snapdrop-for-firefox/" target="_blank">Snapdrop for Firefox - Firefox Addons</a> -->

### Chrome
- Download the <a href="https://github.com/ueen/PairdropWebExtension/releases/latest" target="_blank">latest</a> release zip and extract
- open <a href="chrome://extensions/" target="_blank">chrome://extensions</a> (enable developer mode)
- 'Load unpacked extension' and select the extracted folder

That's it, enjoy!
</br><i>(if you want to add it to Chrome Web Store, please open an issue/discussion)</i>

## Acknowledgements

Thanks for the awesome work of <a href="https://github.com/schlagmichdoch/PairDrop/" target="_blank">Pairdrop</a>
which is a fork of <a href="https://github.com/RobinLinus/snapdrop" target="_blank">Snapdrop</a>, also many thanks to you

I also recommend using this great app: <a href="https://github.com/fm-sys/snapdrop-android" target="_blank">Snapdrop for Android</a>

Chrome Support thanks to <a href="https://github.com/mozilla/webextension-polyfill" target="_blank">WebExtension browser API Polyfill by Mozilla</a>

## License
<a href='https://github.com/ueen/SnapdropFirefoxAddon/blob/main/LICENSE'>GNU General Public License v3.0</a>
