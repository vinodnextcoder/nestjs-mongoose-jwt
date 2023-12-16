import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { createResponse, MockResponse } from "node-mocks-http";
import { Response } from "express";

describe("User Controller", () => {
  let controller: UserController;
  let service: UserService;
  const createUserDto: CreateUserDto = {
    username: "1sss1",
    first_name: "test",
    last_name: "test",
    password: "Sairam1@",
    password_reset_code: "1",
    email: "te@test.com",
    email_code: "eee",
    activation_code: "e",
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(createUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe("create()", () => {
    it("should create a new user", async () => {
      let response: MockResponse<Response> = createResponse();
      response.json = jest.fn();
      const createSpy = jest
        .spyOn(service, "create")
        .mockResolvedValueOnce(mockUser);
      await controller.create(createUserDto, response);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });
});