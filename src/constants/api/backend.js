const backend = branch => {
    switch (branch) {
        case 'local':
            return process.env.REACT_APP_BACKEND_URL_LOCAL;
        case 'test':
            return process.env.REACT_APP_BACKEND_URL_TEST;
        default:
            return process.env.REACT_APP_BACKEND_URL_DEV;
    }
};

export default backend;
