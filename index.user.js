// ==UserScript==
// @name         Twitter: redirect chat to messages
// @namespace    https://x.com/
// @version      2025-12-07
// @description  Redirects chat to messages on twitter
// @author       susstevedev
// @match        https://twitter.com/*
// @match        https://*.twitter.com/*
// @match        https://x.com/*
// @match        https://*.x.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function navigationDetect() {
        if (window.location.pathname === "/i/chat") {
            console.log('redirecting to messages');
            window.location.pathname = "/messages/home";
        }

        window.addEventListener('popstate', function(event) {
            console.log('popstate event triggered');
            window.location.pathname = "/messages/home";
        });

        window.addEventListener('location', function(event) {
            console.log('location event triggered');
            window.location.pathname = "/messages/home";
        });
    }

    const observer = new MutationObserver(function(mutationsList, observer) {
        let messageDiv = document.querySelector('a[data-testid=AppTabBar_DirectMessage_Link]');

        if (messageDiv) {
            messageDiv.setAttribute("href", "/messages/home");

            navigationDetect();

            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
        observer.observe(document.body, { childList: true, subtree: true });
    }, 1000);

    setTimeout(() => {
        navigationDetect();
    }, 1000);
})();
