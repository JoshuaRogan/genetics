let worker = null;

function parseMessageJson(event) {
	try {
		const data = JSON.parse(event.data);
		return data;
	} catch(e) {
		console.error('Failed to parse json', e);
	}
}

function listener(event) {
	try {
		const data = JSON.parse(event.data);
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

export function listenToWorker(listenFunction) {
	if (!worker) {
		return;
	}

	worker.addEventListener(
		 'message',
		(event) => listenFunction(parseMessageJson(event)),
	 	false,
	);
}

