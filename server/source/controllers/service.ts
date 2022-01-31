import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Service Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Sample health check route called.`);
    let found = req.body();
    console.log(found);

    return res.status(200).json({
        message: 'pong'
    });
};

export default { sampleHealthCheck };

const postHealthCheck = async (req: Request, res: Response) => {
    const title: string = req.params.id;
};
