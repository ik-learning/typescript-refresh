class Department {
  public name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees)
  }
}

const accounting = new Department('Accounting');

// accounting.employees[2] = 'Weight' cannot access private property
accounting.addEmployee("Max");
accounting.addEmployee("John");

accounting.describe();
accounting.printEmployeeInfo();
