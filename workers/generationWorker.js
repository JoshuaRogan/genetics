let worker = null;

function parseMessageJson(event) {
	try {
		const data = JSON.parse(event.data);
		return data;
	} catch(e) {
		console.error('Failed to parse json', e);
	}
}

if (worker === null && typeof Worker !== 'undefined') {
	worker = new Worker('/workers/generationWorker.js');
	// worker.addEventListener('message', listener, false);
}

export function getWorker() {
	return worker;
}

export function removeWorker() {
	if (!worker) {
		return;
	}

	worker.terminate();
	worker = null;
}

export function removeAndRecreateWorker() {
	removeWorker();
	worker = new Worker('/workers/generationWorker.js');
}

export function listenToWorker(listenFunction) {
	if (!worker) {
		return;
	}

	worker.addEventListener(
		 'message',
		(event) => listenFunction(parseMessageJson(event)),
	 	{
			once: false,
		},
	);
}

export function removeWorkerListener(listenFunction) {
	if (!worker) {
		return;
	}

	worker.removeEventListener(
		'message',
		(event) => listenFunction(parseMessageJson(event)),
		{
			once: false,
		},
	);
}

