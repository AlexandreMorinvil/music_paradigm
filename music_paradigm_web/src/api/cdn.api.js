export const cdnApi = {
	pingCdn,
};

function pingCdn(cdnUrl) {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(cdnUrl + '/ping.txt', requestOptions).then();
}