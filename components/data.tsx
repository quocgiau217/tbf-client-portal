export const projectData = [
  {
    TaskID: 1,
    TaskName: 'Project Initiation',
    StartDate: new Date('2023-01-01'),
    EndDate: new Date('2023-01-15'),
    Duration: 15,
    Progress: 30,
    SubTasks: [
      { TaskID: 2, TaskName: 'Identify Site Location', StartDate: new Date('2023-01-01'), Duration: 10, Progress: 60 },
      { TaskID: 3, TaskName: 'Perform Soil Test', StartDate: new Date('2023-01-11'), Duration: 7, Progress: 70 },
      { TaskID: 4, TaskName: 'Soil Test Approval', StartDate: new Date('2023-01-18'), Duration: 4, Progress: 80 }
    ]
  },
  {
    TaskID: 5,
    TaskName: 'Project Development',
    StartDate: new Date('2023-01-15'),
    EndDate: new Date('2023-02-20'),
    Duration: 35,
    Progress: 50,
    SubTasks: [
      { TaskID: 6, TaskName: 'Design Plan', StartDate: new Date('2023-01-15'), Duration: 10, Progress: 40 },
      { TaskID: 7, TaskName: 'Obtain Approvals', StartDate: new Date('2023-01-25'), Duration: 15, Progress: 60 },
      { TaskID: 8, TaskName: 'Hire Contractors', StartDate: new Date('2023-02-10'), Duration: 10, Progress: 80 }
    ]
  },
  {
    TaskID: 9,
    TaskName: 'Project Implementation',
    StartDate: new Date('2023-02-21'),
    EndDate: new Date('2023-03-15'),
    Duration: 23,
    Progress: 70,
    SubTasks: [
      { TaskID: 10, TaskName: 'Prepare Site', StartDate: new Date('2023-02-21'), Duration: 5, Progress: 20 },
      { TaskID: 11, TaskName: 'Foundation Work', StartDate: new Date('2023-02-26'), Duration: 10, Progress: 40 },
      { TaskID: 12, TaskName: 'Structure Construction', StartDate: new Date('2023-03-08'), Duration: 8, Progress: 50 }
    ]
  }
];
