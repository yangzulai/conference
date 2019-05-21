import CryptoJS from 'crypto-js';
var key = CryptoJS.enc.Utf8.parse('cDOoncFueMreENcT');
var iv = CryptoJS.enc.Utf8.parse('Con-ere-ceD-cumt');

function AESCrypto(target) {
    if (!target) return "";
    target = target.toString();
    var result = CryptoJS.AES.encrypt(target, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return result.toString();
}

function AESDecrypt(target) {
    if (!target) return "";
    var decrypted = CryptoJS.AES.decrypt(target, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function MD5(target) {
    var result = CryptoJS.MD5(target).toString();
    return result;
}

function clearSpace(string) {
    return string.replace(/\s/g, "");
}

const platform = {
    is: function (tag, navigator) {
        // "iPhone", "iPod", "iPad", "Blackberry", "Android", "wp",
        // "Mac", "Windows", "Linux", "Desktop", "Tablet",
        // "Phone", "iOS", "Standalone"
        const _navigator = navigator || window.navigator
        const platforms = [
            {
                property: 'platform',
                regex: /iPhone/i,
                identity: 'iPhone'
            },
            {
                property: 'platform',
                regex: /iPod/i,
                identity: 'iPod'
            },
            {
                property: 'userAgent',
                regex: /iPad/i,
                identity: 'iPad'
            },
            {
                property: 'userAgent',
                regex: /Blackberry/i,
                identity: 'Blackberry'
            },
            {
                property: 'userAgent',
                regex: /Android/i,
                identity: 'Android'
            },
            {
                property: 'userAgent',
                regex: /Windows\sPhone/i,
                identity: 'wp'
            },
            {
                property: 'platform',
                regex: /Mac/i,
                identity: 'Mac'
            },
            {
                property: 'platform',
                regex: /Win/i,
                identity: 'Windows'
            },
            {
                property: 'platform',
                regex: /Linux/i,
                identity: 'Linux'
            }
        ]
        let platformIs = {}

        for (let i = 0, n = platforms.length; i < n; i++) {
            let _platfrom = platforms[i]
            platformIs[_platfrom.identity] = _platfrom.regex.test(_navigator[_platfrom.property])
        }
        // @property Desktop True if the browser is running on a desktop machine
        platformIs.Desktop = platformIs.Mac || platformIs.Windows || (platformIs.Linux && !platformIs.Android)
        // @property Tablet True if the browser is running on a tablet (iPad)
        platformIs.Tablet = platformIs.iPad
        // @property Phone True if the browser is running on a phone.
        platformIs.Phone = !platformIs.Desktop && !platformIs.Tablet
        // @property iOS True if the browser is running on iOS
        platformIs.iOS = platformIs.iPhone || platformIs.iPad || platformIs.iPod
        // @property Standalone Detects when application has been saved to homescreen.
        platformIs.Standalone = !!window.navigator['standalone']

        return platformIs[tag] || false
    }
}

export default {
    AESCrypto,
    AESDecrypt,
    MD5,
    clearSpace,
    platform
}