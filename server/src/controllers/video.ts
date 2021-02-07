import { create, findAll, findOne, update, remove } from '../services/video';
import { IVideo } from '../interfaces/video';
import { Request, Response } from 'express';
import fs from 'fs';

async function createVideo(req: Request, res: Response) {    
    try {
        req.body.src = req.file.path;
        
        const createdVideo = await create(req.body);
        if(!createdVideo) return res.status(400).send('Invalid video details');        

        res.status(201).send({videoId: createdVideo._id, videoPath: req.file.path});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    };
};

async function getAll(req: Request, res: Response) {
    try {
        let payload = {};

        if(req.query.category) {
            payload = {
                category: req.query.category
            };
        };
        
        const videos = await findAll(payload);
        if(!videos) return res.status(404).send('Videos not found');

        res.status(200).send(videos);
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function getOne(req: Request, res: Response) {
    try {
        const videoId: string = req.params.videoId;

        const video = await findOne(videoId);
        if(!video) return res.status(404).send('Video not found');

        res.status(200).send(video);
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function updateOne(req: Request, res: Response) {
    try {
        const videoId: string = req.params.videoId;
        const videoDetails: IVideo = req.body;

        const updatedVideo = await update(videoId, videoDetails);
        if(!updatedVideo) return res.status(404).send('Video not updated');

        res.sendStatus(200);

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
        
        await fs.unlinkSync(deletedVideo.src);

        res.sendStatus(200);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    };
};

export {
    createVideo,
    getAll,
    getOne,
    updateOne,
    removeOne
};