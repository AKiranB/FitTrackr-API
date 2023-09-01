import { TestingModule, Test } from '@nestjs/testing';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();
    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
