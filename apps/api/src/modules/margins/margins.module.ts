import { Module } from '@nestjs/common';
import { MarginsResolver } from './margins.resolver';
import { MarginsService } from './margins.service';

@Module({
    providers: [MarginsResolver, MarginsService],
})
export class MarginsModule { }