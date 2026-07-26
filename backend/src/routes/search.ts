import express from 'express';
import { AppDataSource } from '../db/data-source';
import { Disability } from '../models/Disability';
import { Intervention } from '../models/Intervention';
import { RegionalResource } from '../models/RegionalResource';

const router = express.Router();

// Global search
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const q = req.query.q as string;
    const type = req.query.type as string; // disability, intervention, resource, all
    const region = req.query.region as string;

    if (!q || q.length < 2) {
      return res.status(400).json({ success: false, error: 'Query too short' });
    }

    const searchTerm = `%${q}%`;
    const results: any = {};

    // Search disabilities
    if (!type || type === 'disability' || type === 'all') {
      const disabilityRepository = AppDataSource.getRepository(Disability);
      results.disabilities = await disabilityRepository
        .createQueryBuilder('disability')
        .where('disability.name ILIKE :searchTerm', { searchTerm })
        .orWhere('disability.description ILIKE :searchTerm', { searchTerm })
        .limit(10)
        .getMany();
    }

    // Search interventions
    if (!type || type === 'intervention' || type === 'all') {
      const interventionRepository = AppDataSource.getRepository(Intervention);
      results.interventions = await interventionRepository
        .createQueryBuilder('intervention')
        .where('intervention.name ILIKE :searchTerm', { searchTerm })
        .orWhere('intervention.description ILIKE :searchTerm', { searchTerm })
        .limit(10)
        .getMany();
    }

    // Search resources
    if (!type || type === 'resource' || type === 'all') {
      const resourceRepository = AppDataSource.getRepository(RegionalResource);
      let query = resourceRepository
        .createQueryBuilder('resource')
        .where('resource.title ILIKE :searchTerm', { searchTerm })
        .orWhere('resource.description ILIKE :searchTerm', { searchTerm });

      if (region) {
        query = query.andWhere('resource.region = :region', { region });
      }

      results.resources = await query.limit(10).getMany();
    }

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

export default router;
