export default function (response, handleErrorStatus = () => {}) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            handleErrorStatus(response.status);

            const error = (data && data.message) || response.statusText;
            return Promise.reject(new Error(error));
        }

        return data;
    });
}
