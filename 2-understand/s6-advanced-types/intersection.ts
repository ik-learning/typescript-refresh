type Admin = {
  name: string;
  privileges: string[];
};

interface Employee {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
// or
interface IElevatedEmployee extends Employee, Admin { }

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}

console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
