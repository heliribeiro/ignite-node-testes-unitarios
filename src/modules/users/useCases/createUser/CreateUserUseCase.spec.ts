import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUser: CreateUserUseCase;
let inMemoryUsersRespository: InMemoryUsersRepository;

describe("Create a new User", () => {

  beforeEach(()=>{
    inMemoryUsersRespository = new InMemoryUsersRepository();
    createUser = new CreateUserUseCase(inMemoryUsersRespository);
  })

  it('Should be able to create a new User', async () => {
     const user = {
      name: "Heli",
      email: "heliribeiro2@gmail.com",
      password: "123456",
     }

     await createUser.execute({
      name: user.name,
      email: user.email,
      password: user.password,
     });

     const userCreated = await inMemoryUsersRespository.findByEmail(user.email);
     
     expect(userCreated).toHaveProperty("id");

  })
})