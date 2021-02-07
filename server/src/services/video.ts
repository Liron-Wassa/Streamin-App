import { IVideo } from '../interfaces/video';
import VideoService from '../models/video';

function create(videoDetails: IVideo): Promise<IVideo> {
    return (
        new Promise((resolve, reject) => {
            VideoService.create(videoDetails, (error, createdVideo) => {
                if(error) reject(new Error(error.message));

                else resolve(createdVideo);
            });
        })
    );
};

function findAll(payload: object): Promise<IVideo[]> {
    return (
        new Promise((resolve, reject) => {
            VideoService.find(payload, (error, foundVideos) => {
                if(error) reject(new Error(error));

                else resolve(foundVideos);
            });
        })
    );
};

function findOne(id: string): Promise<IVideo | null> {
    return (
        new Promise((resolve, reject) => {
            VideoService.findById(id, null, null, (error, foundVideo) => {
                if(error) reject(new Error(error.message));

                else resolve(foundVideo);
            });
        })
    );
};

function update(videoId: string, videoDetails: IVideo): Promise<IVideo | null> {
    return (
        new Promise((resolve, reject) => {
            VideoService.findByIdAndUpdate(videoId, videoDetails, null,  (error, updatedVideo) => {
                if(error) reject(new Error(error));

                else resolve(updatedVideo);
            });
        })
    );
};

function remove(videoId: string): Promise<IVideo | null> {
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
    findAll,
    findOne,
    update,
    remove
};