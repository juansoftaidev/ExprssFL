import { faker } from '@faker-js/faker';

function factoryDataUser () {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const randomAddress = faker.location.address();

  return {
    name: randomName,
    email: randomEmail,
    address: randomAddress,
  };
}

const randomUser  = factoryDataUser ();
console.log('Random User Data:', randomUser );