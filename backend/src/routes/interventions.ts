import express from 'express';
import { AppDataSource } from '../db/data-source';
import { Intervention } from '../models/Intervention';

const router = express.Router();

// GET all interventions with filtering
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const ageGroup = req.query.ageGroup as string;
    const region = req.query.region as string;
    const evidenceLevel = req.query.evidenceLevel as string;

    const interventionRepository = AppDataSource.getRepository(Intervention);
    let query = interventionRepository.createQueryBuilder('intervention');

    if (ageGroup) {
      query = query.andWhere(':ageGroup = ANY(intervention.ageGroups)', { ageGroup });
    }

    if (region) {
      query = query.andWhere(':region = ANY(intervention.regions)', { region });
    }

    if (evidenceLevel) {
      query = query.andWhere('intervention.evidenceLevel = :evidenceLevel', { evidenceLevel });
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
    res.status(500).json({ success: false, error: 'Failed to fetch interventions' });
  }
});

// GET intervention by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const interventionRepository = AppDataSource.getRepository(Intervention);
    const intervention = await interventionRepository.findOne({
      where: { id: req.params.id },
      relations: ['disabilities'],
    });

    if (!intervention) {
      return res.status(404).json({ success: false, error: 'Intervention not found' });
    }

    res.json({ success: true, data: intervention });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch intervention' });
  }
});

export default router;
