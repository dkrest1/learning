import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { Cat } from './cat.interface';

describe('CatController', () => {
  let catController: CatController;
  let catService: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    catController = module.get<CatController>(CatController);
    catService = await module.get(CatService);
  });

  it('should be defined', () => {
    expect(catController).toBeDefined();
  });

  describe('findAll', () => {
    it('it should fetch an array of cats', async () => {
      const cats: Cat[] = [{ name: 'hello', age: 20, breed: 'grace' }];
      jest.spyOn(catService, 'findAll').mockImplementation(() => cats);
      expect(await catController.findAll()).toBe(cats);
    });
  });
});
