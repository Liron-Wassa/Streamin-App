import axios, { CancelTokenSource } from 'axios';
import { IVideo } from '../interfaces/video';

let source: CancelTokenSource | null = null;

interface VideoCreated {
    videoId: string,
    videoSrc: string
};

export const fetchVideos = (category: string): Promise<IVideo[]> => {
    source = axios.CancelToken.source();

    return (
        axios.get(`/api/videos?category=${category}`, {
            cancelToken: source.token
        })
        .then(res => {
            const videos: IVideo[] = res.data;

            return videos;
        })
        .catch(error => {
            const errorMessage = error.response ? error.response.data : error;

            throw new Error(errorMessage);
        })
    );
};

export const fetchAllVideos = (token: string): Promise<IVideo[]> => {    
    source = axios.CancelToken.source();

    const config = {
        headers: { 'Authorization': token },
        cancelToken: source.token
    };

    return (
        axios.get('/api/videos/contents', config)
        .then(res => {
            const videos: IVideo[] = res.data;

            return videos;
        })
        .catch(error => {
            const errorMessage = error.response ? error.response.data : error;

            throw new Error(errorMessage);
        })
    );
};

export const fetchVideo = (token: string, videoId: string): Promise<IVideo> => {
    source = axios.CancelToken.source();

    const config = {
        headers: { 'Authorization': token },
        cancelToken: source.token
    };

    return (
        axios.get(`/api/videos/${videoId}`, config)
        .then(res => {
            const video: IVideo = res.data;

            return video;
        })
        .catch(error => {
            const errorMessage = error.response ? error.response.data : error;

            throw new Error(errorMessage);
        })
    );
};

export const createVideo = (token: string, formData: FormData): Promise<VideoCreated> => {
    source = axios.CancelToken.source();
    
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
        },
        cancelToken : source.token
    };

    return (
        axios.post('/api/videos', formData, config)
        .then(res => {
            const partialVideoDetails: VideoCreated = {
                videoId: res.data.videoId,
                videoSrc: res.data.videoSrc
            };

            return partialVideoDetails;
        })
        .catch(error => {
            const errorMessage = error.response ? error.response.data : error;

            throw new Error(errorMessage);
        })
    );
};

export const updateVideo = (token: string, videoId: string, updatedFields: IVideo): Promise<number> => {
    source = axios.CancelToken.source();

    const config = {
        headers: { 'Authorization': token },
        cancelToken: source.token
    };
    
    return (
        axios.patch(`/api/videos/${videoId}`, updatedFields, config)
        .then(res => res.status)
        .catch(error => {        
            const errorMessage = error.response ? error.response.data : error;

            throw new Error(errorMessage);
        })
    );
};

export const deleteVideo = (token: string, videoId: string): Promise<number> => {
    source = axios.CancelToken.source();

    const config = {
        headers: { 'Authorization': token },
        cancelToken: source.token
    };

    return (
        axios.delete(`/api/videos/${videoId}`, config)
        .then(res => res.status)
        .catch(error => {
            const errorMessage = error.response ? error.response.data : error;
    
            throw new Error(errorMessage);
        })
    );
};

export const cancelVideoRequest = () => {
    if(source) {
        source.cancel();
    };
};