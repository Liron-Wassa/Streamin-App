import VideoService from '../models/video';
import IVideo from '../interfaces/video';

function create(videoDetails: IVideo): Promise<IVideo | object> {
    return (
        new Promise((resolve, reject) => {
            VideoService.create(videoDetails, (error, createdVideo) => {
                if(error) reject(new Error(error.message));

                else resolve(createdVideo);
            });
        })
    );
};

function find(payload: object): Promise<IVideo[] | []> {
    return (
        new Promise((resolve, reject) => {
            VideoService.find(payload, (error, foundVideos) => {
                if(error) reject(new Error(error));

                else resolve(foundVideos);
            });
        })
    );
};

function update(videoId: string, videoDetails: IVideo): Promise<IVideo | object> {
    return (
        new Promise((resolve, reject) => {
            VideoService.findByIdAndUpdate(videoId, videoDetails, { rawResult: true },  (error, updatedVideo) => {
                if(error) reject(new Error(error));

                else resolve(updatedVideo);
            });
        })
    );
};

function remove(videoId: string) {
    return (
        new Promise((resolve, reject) => {
            VideoService.findByIdAndDelete(videoId, null, (error, deletedVideo) => {
                if(error) reject(new Error(error));

                else resolve(deletedVideo);
            });
        })
    );
};

export {
    create,
    find,
    update,
    remove
};