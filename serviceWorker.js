// These service worker used to notify  online and offline status of the application
// suppose in between running api suppose app goes offline then we should notify them about application status

export function register(toast) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
            let isAppOnline = navigator.onLine;
            window.addEventListener('online', () => {
                if (!isAppOnline) {
                    console.log('connectivity is back, sync in progress...');
                    isAppOnline = true;
                }
            });

            window.addEventListener('offline', () => {
                console.log('The app is running offline, any changes mades during this time will be synced as soon as the connectivity is back');
                isAppOnline = false;
            });
            // check whether the service worker using it is valid and  idfi's service worker
            registerValidSW(swUrl);
        });
    }
}

//
function registerValidSW(swUrl, toast) {
    navigator.serviceWorker
        .register(swUrl, {
            scope: '/'
        })
        .then(registration => {
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            console.log('New content is available; please refresh.');
                        } else {
                            console.log('Content is cached for offline use.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.log('Error during service worker registration: ' + error);
        });
}

// check whether the service worker running on the system is valid or not
export function checkValidServiceWorker(swUrl, toast) {
    fetch(swUrl)
        .then(response => {
            if (
                response.status === 404 ||
          response.headers.get('content-type').indexOf('javascript') === -1
            ) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
