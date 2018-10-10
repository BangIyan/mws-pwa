//version
let appVersion = 'v1.00';

//files to cache
let files = [
	'./',
	'./index.html',
	'./index.css',
	'https://fonts.googleapis.com/css?family=Dosis:300,400,500',
	'./img/profil.PNG'
]

//install (caches files)
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(appVersion)
		.then(cache => {
			return cache.addAll(files)
			.catch(err => {
				console.error('Error adding files to cache', err);
			})
		})
	)
	console.info('SW Installed');
	self.skipWaiting();
})

//activate (manage old caches)
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== appVersion) {
						console.info('Deleting old cache', cache);
						return caches.delete(cache);
					}
				})
			)
		})
	)
	return self.clients.claim();
})

//fetch (control network request)
self.addEventListener('fetch', event => {
	console.info('SW fetch', event.request.url);
	event.respondWith(
		caches.match(event.request)
		.then(res => {
			return res || fetch(event.request);
		})
	)
})