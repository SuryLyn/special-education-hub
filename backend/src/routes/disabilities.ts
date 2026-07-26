import express from 'express';
import { AppDataSource } from '../db/data-source';
import { Disability } from '../models/Disability';

const router = express.Router();

// GET all disabilities with pagination
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const category = req.query.category as string;

    const disabilityRepository = AppDataSource.getRepository(Disability);
    let query = disabilityRepository.createQueryBuilder('disability');

    if (category) {
      query = query.where('disability.category = :category', { category });
    }

    const [data, total] = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

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
    res.status(500).json({ success: false, error: 'Failed to fetch disabilities' });
  }
});

// GET disability by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const disabilityRepository = AppDataSource.getRepository(Disability);
    const disability = await disabilityRepository.findOne({
      where: { id: req.params.id },
      relations: ['interventions'],
    });

    if (!disability) {
      return res.status(404).json({ success: false, error: 'Disability not found' });
    }

    res.json({ success: true, data: disability });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch disability' });
  }
});

export default router;
