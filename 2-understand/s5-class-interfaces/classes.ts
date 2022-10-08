class Department {
  fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    this.id = id;
    this.name = name;
  }

  static createEmployee(name: string) {
    return { name: name }
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
  private lastReport: string;
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.reports = reports;
    this.lastReport = reports[0];
  }

  addEmployee(name: string): void {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a value')
    }
    this.addReport(value);
  }

  getReports() {
    console.log(this.reports)
  }
}

const acc = new Accounting('it1', []);
acc.addReport('Something went wrong')
console.log(acc.mostRecentReport)
acc.mostRecentReport = 'Test it'
console.log(acc.mostRecentReport)

const emp1 = Department.createEmployee('Max')
console.log(emp1);
