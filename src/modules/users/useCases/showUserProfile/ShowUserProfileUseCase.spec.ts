import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRespository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Create a new User", () => {

  beforeEach(()=>{
    inMemoryUsersRespository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRespository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRespository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRespository);
  })

  it('Should be able to get a user Profile', async () => {
     const user = {
      name: "Heli",
      email: "heliribeiro2@gmail.com",
      password: "123456",
     }

     await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
     });

     const userAuthenticated = await authenticateUserUseCase.execute({email: user.email, password: user.password})
     
     const profile = await showUserProfileUseCase.execute(userAuthenticated?.user?.id ? userAuthenticated.user.id : '');

     
     expect(profile).toHaveProperty("name");

  })
})