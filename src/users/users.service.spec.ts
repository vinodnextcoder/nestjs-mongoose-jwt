import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';

const mockUser = {
    username: "1sss1",
    first_name: "test",
    last_name: "test",
    password: "Sairam1@",
    password_reset_code: "1",
    email: "te@test.com",
    email_code: "eee",
    activation_code: "e",
  };
const mockResponse = [
    {
      username: "1sss1",
      first_name: "test",
      last_name: "test",
      password: "Sairam1@",
      password_reset_code: "1",
      email: "te@test.com",
      email_code: "eee",
      activation_code: "e",
    },
    {
      username: "test",
      first_name: "test",
      last_name: "test",
      password: "Sairam1@",
      password_reset_code: "1",
      email: "te@test.com",
      email_code: "eee",
      activation_code: "e",
    }
  ];

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockResponse),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(mockResponse);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve(mockUser as any),
    );
    const newCat = await service.create(mockUser);
    expect(newCat).toEqual(mockUser);
  });
});


