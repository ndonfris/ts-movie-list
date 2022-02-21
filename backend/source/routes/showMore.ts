import express from 'express';
import controller from '../controllers/moreInfo';

const router = express.Router();

router.post('/more_info', controller.moreInfo);
router.post('/streaming', controller.streamingInfo);

export = router;
