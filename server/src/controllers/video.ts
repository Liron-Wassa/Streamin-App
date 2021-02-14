import { create, findAll, findOne, update, remove } from '../services/video';
import cloudinary from '../config/cloudinary';
import { IVideo } from '../interfaces/video';
import { Request, Response } from 'express';
import fs from 'fs';
interface ICloundinaryData {
    videoResourceId: string,
    videoResourceUrl: string
};

function _uploadToCloundinary(req: Request): Promise<ICloundinaryData> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(req.file.path, { resource_type: "video" }, (error, result) => {
            const videoData: ICloundinaryData = { videoResourceId: result!.public_id, videoResourceUrl: result!.secure_url };

            if(error) reject(new Error(error.message));
            else resolve(videoData);
        });
    });    
};

async function createVideo(req: Request, res: Response) {    
    try {
        const { videoResourceId, videoResourceUrl } = await _uploadToCloundinary(req);

        req.body.src = videoResourceUrl;
        req.body.resourceId = videoResourceId;
        
        const createdVideo = await create(req.body);
        if(!createdVideo) return res.status(400).send('Invalid video details');        

        res.status(201).send({videoId: createdVideo._id, videoSrc: videoResourceUrl});
        
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
        
        await cloudinary.uploader.destroy(deletedVideo.resourceId, { resource_type: "video" });
        
        res.sendStatus(200);

        // delete local files
        // await fs.unlinkSync(deletedVideo.src);

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