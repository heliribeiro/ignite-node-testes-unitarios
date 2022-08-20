import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IAuthenticateUserResponseDTO } from "./IAuthenticateUserResponseDTO";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRespository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(()=> {
    inMemoryUsersRespository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRespository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRespository);
  })

  it("Should be able to authenticate an user", async ()=> {
    const user : ICreateUserDTO = {
      name: "Heli",
      email: "heli@gmail.com",
      password: "123456789",
    }

    await createUserUseCase.execute(user);

    const userAuthenticaded: IAuthenticateUserResponseDTO = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
  
    expect(userAuthenticaded).toHaveProperty("token");
  })

  it("Should not be able to authenticate an nonexistent user", async () => {
    expect(async()=>{
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "testsenhaerrada",
      })
    }).rejects.toBeInstanceOf(AppError);
  })

  it("Should not be able to authenticate with incorrect password", async ()=> {
    expect(async()=>{

      const user : ICreateUserDTO = {
        name: "Heli",
        email: "heli@gmail.com",
        password: "123456789",
      }

      await createUserUseCase.execute(user);
      
      const t = await authenticateUserUseCase.execute({
        email: user.email,
        password: 'error',
      })

    }).rejects.toBeInstanceOf(AppError);
  })
})