import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Sample health check route called.`);
    let found = req.body();
    console.log(found);

    return res.status(200).json({
        message: 'pong'
    });
};

export default { sampleHealthCheck };
