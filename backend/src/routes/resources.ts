import express from 'express';
import { AppDataSource } from '../db/data-source';
import { RegionalResource } from '../models/RegionalResource';

const router = express.Router();

// GET resources by region
router.get('/region/:region', async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const resourceRepository = AppDataSource.getRepository(RegionalResource);
    const [data, total] = await resourceRepository.findAndCount({
      where: { region: req.params.region },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
    });

    res.json({
      success: true,
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch resources' });
  }
});

// GET resource by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const resourceRepository = AppDataSource.getRepository(RegionalResource);
    const resource = await resourceRepository.findOne({
      where: { id: req.params.id },
    });

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch resource' });
  }
});

export default router;
