// mailer/templates.ts

export const newCaseTemplate = (caseDetails: any) => `
  <h1>New Case Created</h1>
  <p>A new case has been created with the following details:</p>
  <ul>
    <li>Title: ${caseDetails.title}</li>
    <li>Type: ${caseDetails.type}</li>
    <li>Description: ${caseDetails.description}</li>
  </ul>
`;

export const newEmployeeTemplate = (employeeDetails: any) => `
  <h1>Welcome to Our Company!</h1>
  <p>Hello ${employeeDetails.name},</p>
  <p>We're excited to have you join our team. Your account has been created with the following details:</p>
  <ul>
    <li>Email: ${employeeDetails.email}</li>
    <li>Employee ID: ${employeeDetails.employeeId}</li>
  </ul>
  <p>Please log in to our system to complete your profile and get started.</p>
`;