import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './cat.interface';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}
  @Post()
  async create(@Body() cat: Cat) {
    return this.catService.create(cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }
}
