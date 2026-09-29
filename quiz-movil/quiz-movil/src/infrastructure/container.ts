import { IPersonRepository } from '../domain/repositories/IPersonRepository';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { PersonRepository } from './repositories/PersonRepository';
import { ProductRepository } from './repositories/ProductRepository';
import { UserRepository } from './repositories/UserRepository';

interface Container {
  userRepository: IUserRepository;
  productRepository: IProductRepository;
  personRepository: IPersonRepository;
}

export const container: Container = {
  userRepository: new UserRepository(),
  productRepository: new ProductRepository(),
  personRepository: new PersonRepository(),
};
