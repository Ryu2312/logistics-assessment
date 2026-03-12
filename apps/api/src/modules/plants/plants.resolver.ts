import { Query, Resolver } from '@nestjs/graphql';
import { PlantsService } from './plants.service';
import { PlantModel } from './models/plant.model';

@Resolver(() => PlantModel)
export class PlantsResolver {
    constructor(private readonly plantsService: PlantsService) { }

    @Query(() => [PlantModel], { name: 'plants' })
    async findAll() {
        return this.plantsService.findAll();
    }
}