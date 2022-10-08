class Department {
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    this.id = id;
    this.name = name;
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

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

const dep = new ITDepartment('it1', ['John', 'Celvin']);
console.log(dep)

class Accounting extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.reports = reports;
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  getReports() {
    console.log(this.reports)
  }
}

const acc = new Accounting('it1', []);
acc.addReport('Something went wrong')
console.log(acc)
