class DepartmentV3 {
  // private id: string;
  // public name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    this.id = id;
    this.name = name;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    // validation
    // this.id = 'asdfasf'
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees)
  }
}

const accounting = new Department('f7686aea-46e2-11ed-aaee-7bae38cba10b', 'Accounting');

// accounting.employees[2] = 'Weight' cannot access private property
accounting.addEmployee("Max");
accounting.addEmployee("John");

accounting.describe();
accounting.printEmployeeInfo();
