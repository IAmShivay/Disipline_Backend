export const newCaseTemplate = (caseDetails: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      body { width: 100% !important; padding: 0 !important; }
      .container { padding: 15px !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f7f9;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
      margin-bottom: 20px;
      text-align: center;
    }
    ul {
      background-color: #f1f4f8;
      border-left: 5px solid #3b82f6;
      padding: 15px 15px 15px 30px;
      border-radius: 4px;
    }
    li {
      margin-bottom: 10px;
      list-style-type: none;
      color: #34495e;
    }
    li strong {
      color: #3b82f6;
      display: inline-block;
      width: 100px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>New Case Created</h1>
    <p>A new case has been created with the following details:</p>
    <ul>
      <li><strong>Title:</strong> ${caseDetails.title}</li>
      <li><strong>Type:</strong> ${caseDetails.type}</li>
      <li><strong>Description:</strong> ${caseDetails.description}</li>
    </ul>
  </div>
</body>
</html>
`;
export const newEmployeeTemplate = (employeeDetails: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      body { 
        width: 100% !important; 
        padding: 0 !important; 
      }
      .container { 
        padding: 15px !important; 
      }
      .login-btn { 
        width: 100% !important; 
        font-size: 16px; /* Adjusted font size for small screens */
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f7f9;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
      margin-bottom: 20px;
      text-align: center;
    }
    ul {
      background-color: #f1f4f8;
      border-left: 5px solid #3b82f6;
      padding: 15px 15px 15px 30px;
      border-radius: 4px;
    }
    li {
      margin-bottom: 10px;
      list-style-type: none;
      color: #34495e;
    }
    li strong {
      color: #3b82f6;
      display: inline-block;
      width: 120px;
    }
    .login-btn {
      display: block;
      background-color: #3b82f6;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      width: 100%; /* Set to 100% for full-width responsiveness */
      max-width: 200px; /* Optional max-width for larger screens */
      margin-left: auto;
      margin-right: auto; /* Center align button */
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Our Company!</h1>
    <p>Hello ${employeeDetails.name},</p>
    <p>We're excited to have you join our team. Your account has been created with the following details:</p>
    <ul>
      <li><strong>Email:</strong> ${employeeDetails.email}</li>
      <li><strong>Employee ID:</strong> ${employeeDetails.employeeId}</li>
    </ul>
    <p>Please log in to our system to complete your profile and get started.</p>
    <a href="#" class="login-btn">Log In</a>
  </div>
</body>
</html>
`;
