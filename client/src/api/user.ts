import axios, { CancelTokenSource } from 'axios';

let source: CancelTokenSource | null = null;

export const userLogin = (email: string, password: string): Promise<string> => {
    source = axios.CancelToken.source();

    return (
        axios.post('/api/users/login', {email, password}, {
            cancelToken: source.token
        })
        .then(res => res.data)
        .catch(error => {
            const errorMessage = error.response ? error.response.data : error;

            throw new Error(errorMessage);
        })
    );
};

export const cancelUserRequest = () => {
    if(source) {
        source.cancel();
    };
};