import axios from 'axios'
import sessionHelper from './sessionHelper';
import refreshTokenAPI from '../../api/refreshTokenAPI';

const defaultConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    token: null,
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    })

    failedQueue = [];
}

/* Interceptors */
//Request
axios.interceptors.request.use(config => {
    const token = sessionHelper.getAuthToken("UserToken");

    config.headers.Authorization = `bearer ${token}`;

    return Promise.resolve(config);
}, error => (
    Promise.reject(error)
));

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;

                    return axios(originalRequest);
                }).catch(err => err )
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = sessionHelper.getAuthToken("RefreshToken");
            const userId = sessionHelper.getAuthToken("UserId");

            return new Promise(function (resolve, reject) {
                refreshTokenAPI.refreshToken({
                    refresh_token: refreshToken,
                    user_id: userId
                })
                    .then(({data}) => {
                        sessionHelper.setAuthToken("UserToken", data.token);

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;

                        processQueue(null, data.token);

                        resolve(axios(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .then(() => { isRefreshing = false })
            })
        }

        return Promise.reject(error);
    }
);

const post = ({ url = '', data = {}, config = defaultConfig }) => {
    return axios.post(url, data, config)
};

const get = ({ url, config = defaultConfig }) => {
    return axios.get(url, config);
};

const put = ({ url = '', data = {}, config = defaultConfig }) => {
    return axios.put(url, data, config);
};

const del = ({ url = '', config = defaultConfig }) => {
    return axios.delete(url, config)
};

const HttpClient = {
    post,
    get,
    put,
    delete: del,
};

export default HttpClient;