import { create, find, update, remove } from '../services/video';
import { Request, Response } from 'express';
import IVideo from '../interfaces/video';

async function createVideo(req: Request, res: Response) {
    try {
        const createdVideo = await create(req.body);
        if(!createdVideo) return res.status(400).send('Invalid video details');

        res.status(200).send(createdVideo);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    };
};

async function findAll(req: Request, res: Response) {
    try {
        const videos = await find({});
        if(!videos) return res.status(404).send('Videos not found');

        res.status(200).send(videos);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    };
};

async function updateOne(req: Request, res: Response) {
    try {
        const videoId: string = req.params.videoId;
        const videoDetails: IVideo = req.body;

        const updatedVideo = await update(videoId, videoDetails);
        if(!updatedVideo) return res.status(404).send('Video not updated');

        res.send(200);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    };
};

async function removeOne(req: Request, res: Response) {
    try {
        const videoId: string = req.params.videoId;

        const deletedVideo = await remove(videoId);
        if(!deletedVideo) return res.status(404).send('Video not deleted');

        res.send(200);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    };
};

export {
    createVideo,
    findAll,
    updateOne,
    removeOne
};