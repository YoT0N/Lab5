export class User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  position: string;
  photo = "la/laba5/src/images/anonim.png";
  hobbies: string[];

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    position: string,
    hobbies: string[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;
    this.photo = "/laba5/src/images/anonim.png";
    this.hobbies = hobbies;
  }
}
