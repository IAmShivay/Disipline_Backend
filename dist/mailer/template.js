"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetRequestedTemplate = exports.passwordChangedTemplate = exports.caseClosedTemplate = exports.caseRegisteredTemplate = exports.terminationNoticeTemplate = exports.loginAlertTemplate = exports.inviteTemplate = exports.signupConfirmationTemplate = exports.meetingInvitationTemplate = exports.appreciationLetterTemplate = exports.warningLetterTemplate = exports.newEmployeeTemplate = exports.newCaseTemplate = void 0;
const newCaseTemplate = (caseDetails) => `
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
exports.newCaseTemplate = newCaseTemplate;
const newEmployeeTemplate = (employeeDetails) => `
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
exports.newEmployeeTemplate = newEmployeeTemplate;
const warningLetterTemplate = (employeeDetails, issueDetails) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      body { width: 100% !important; padding: 0 !important; }
      .container { padding: 15px !important; }
      .acknowledge-btn { width: 100% !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f7f9;
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(220, 53, 69, 0.1);
      padding: 30px;
    }
    h1 {
      color: #dc3545;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #dc3545;
      padding-bottom: 10px;
    }
    ul {
      padding: 15px 15px 15px 30px;
      background-color: #f8d7da;
      border-left: 5px solid #dc3545;
      border-radius: 4px;
    }
    li {
      list-style: none;
      color: #34495e;
      margin-bottom: 10px;
    }
    li strong {
      color: #dc3545;
      display: inline-block;
      width: 120px;
    }
    p {
      margin-bottom: 10px;
    }
    .acknowledge-btn {
      display: block;
      background-color: #dc3545;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      width: 100%;
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Warning Notice</h1>
    <p>Dear ${employeeDetails.name},</p>
    <p>This is to formally bring to your attention the following issue(s):</p>
    <ul>
      <li><strong>Date:</strong> ${issueDetails.date}</li>
      <li><strong>Issue:</strong> ${issueDetails.issue}</li>
      <li><strong>Reported By:</strong> ${issueDetails.reportedBy}</li>
    </ul>
    <p>Please take immediate steps to rectify this behavior. Continued issues may lead to further action, including termination.</p>
    <a href="#" class="acknowledge-btn">Acknowledge</a>
  </div>
</body>
</html>
`;
exports.warningLetterTemplate = warningLetterTemplate;
const appreciationLetterTemplate = (employeeDetails, achievementDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(40, 167, 69, 0.1);
      padding: 30px;
    }
    h1 {
      color: #28a745;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #28a745;
      padding-bottom: 10px;
    }
    ul {
      padding: 15px 15px 15px 30px;
      background-color: #d4edda;
      border-left: 5px solid #28a745;
      border-radius: 4px;
    }
    li {
      list-style: none;
      color: #34495e;
      margin-bottom: 10px;
    }
    li strong {
      color: #28a745;
      display: inline-block;
      width: 120px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Congratulations!</h1>
    <p>Dear ${employeeDetails.name},</p>
    <p>We are thrilled to recognize your incredible contributions:</p>
    <ul>
      <li><strong>Achievement:</strong> ${achievementDetails.title}</li>
      <li><strong>Date:</strong> ${achievementDetails.date}</li>
      <li><strong>Impact:</strong> ${achievementDetails.impact}</li>
    </ul>
    <p>Your efforts inspire the entire team. Keep up the great work!</p>
  </div>
</body>
</html>
`;
exports.appreciationLetterTemplate = appreciationLetterTemplate;
const meetingInvitationTemplate = (meetingDetails) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      body { width: 100% !important; padding: 0 !important; }
      .container { padding: 15px !important; }
      .join-btn { width: 100% !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f7f9;
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }
    ul {
      padding: 15px 15px 15px 30px;
      background-color: #e7f3ff;
      border-left: 5px solid #3b82f6;
      border-radius: 4px;
    }
    li {
      list-style: none;
      color: #34495e;
      margin-bottom: 10px;
    }
    li strong {
      color: #3b82f6;
      display: inline-block;
      width: 120px;
    }
    p {
      margin-bottom: 10px;
    }
    .join-btn {
      display: block;
      background-color: #3b82f6;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      width: 100%;
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Meeting Invitation</h1>
    <p>Hello,</p>
    <p>You are invited to the following meeting:</p>
    <ul>
      <li><strong>Topic:</strong> ${meetingDetails.topic}</li>
      <li><strong>Date:</strong> ${meetingDetails.date}</li>
      <li><strong>Time:</strong> ${meetingDetails.time}</li>
      <li><strong>Location:</strong> ${meetingDetails.location}</li>
    </ul>
    <a href="${meetingDetails.link}" class="join-btn">Join Meeting</a>
  </div>
</body>
</html>
`;
exports.meetingInvitationTemplate = meetingInvitationTemplate;
const signupConfirmationTemplate = (userDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Signup Successful</h1>
    <p>Hello ${userDetails.name},</p>
    <p>Your account has been successfully created. You can now log in to access your dashboard and explore our features.</p>
    <p>If you have any questions, feel free to reach out to support.</p>
  </div>
</body>
</html>
`;
exports.signupConfirmationTemplate = signupConfirmationTemplate;
const inviteTemplate = (inviteDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }
    .join-btn {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>You're Invited!</h1>
    <p>Hello ${inviteDetails.recipientName},</p>
    <p>${inviteDetails.senderName} has invited you to join ${inviteDetails.platformName}. Click the button below to get started.</p>
    <a href="${inviteDetails.inviteLink}" class="join-btn">Accept Invitation</a>
  </div>
</body>
</html>
`;
exports.inviteTemplate = inviteTemplate;
const loginAlertTemplate = (alertDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(220, 53, 69, 0.1);
      padding: 30px;
    }
    h1 {
      color: #dc3545;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #dc3545;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Login Alert</h1>
    <p>Hi ${alertDetails.name},</p>
    <p>We noticed a login to your account from a new device:</p>
    <ul>
      <li><strong>Device:</strong> ${alertDetails.device}</li>
      <li><strong>Location:</strong> ${alertDetails.location}</li>
      <li><strong>Time:</strong> ${alertDetails.time}</li>
    </ul>
    <p>If this wasn't you, please secure your account immediately.</p>
  </div>
</body>
</html>
`;
exports.loginAlertTemplate = loginAlertTemplate;
const terminationNoticeTemplate = (employeeDetails, terminationDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(220, 53, 69, 0.1);
      padding: 30px;
    }
    h1 {
      color: #dc3545;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #dc3545;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Employment Termination</h1>
    <p>Dear ${employeeDetails.name},</p>
    <p>This letter serves as formal notification of the termination of your employment with ${terminationDetails.companyName} effective ${terminationDetails.effectiveDate}.</p>
    <p>We thank you for your contributions during your tenure and wish you success in your future endeavors.</p>
    <p>If you have questions or require further information, please contact HR.</p>
  </div>
</body>
</html>
`;
exports.terminationNoticeTemplate = terminationNoticeTemplate;
const caseRegisteredTemplate = (caseDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Case Registered</h1>
    <p>Dear ${caseDetails.userName},</p>
    <p>Your case has been successfully registered with the following details:</p>
    <ul>
      <li><strong>Case ID:</strong> ${caseDetails.caseId}</li>
      <li><strong>Subject:</strong> ${caseDetails.subject}</li>
      <li><strong>Submission Date:</strong> ${caseDetails.date}</li>
    </ul>
    <p>We will review your case and update you shortly.</p>
  </div>
</body>
</html>
`;
exports.caseRegisteredTemplate = caseRegisteredTemplate;
const caseClosedTemplate = (caseDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(40, 167, 69, 0.1);
      padding: 30px;
    }
    h1 {
      color: #28a745;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #28a745;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Case Closed</h1>
    <p>Dear ${caseDetails.userName},</p>
    <p>We are pleased to inform you that your case has been successfully resolved:</p>
    <ul>
      <li><strong>Case ID:</strong> ${caseDetails.caseId}</li>
      <li><strong>Resolution Date:</strong> ${caseDetails.date}</li>
    </ul>
    <p>Thank you for your patience. If you have any further questions, feel free to contact us.</p>
  </div>
</body>
</html>
`;
exports.caseClosedTemplate = caseClosedTemplate;
const passwordChangedTemplate = (userDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(40, 167, 69, 0.1);
      padding: 30px;
    }
    h1 {
      color: #28a745;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #28a745;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Changed</h1>
    <p>Dear ${userDetails.name},</p>
    <p>Your password has been successfully changed on ${userDetails.date}.</p>
    <p>If you did not make this change, please contact our support team immediately.</p>
  </div>
</body>
</html>
`;
exports.passwordChangedTemplate = passwordChangedTemplate;
const passwordResetRequestedTemplate = (resetDetails) => `
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
    }
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      padding: 30px;
    }
    h1 {
      color: #3b82f6;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
    .reset-btn {
      display: block;
      background-color: #3b82f6;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      width: 100%;
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Reset Request</h1>
    <p>Hello ${resetDetails.name},</p>
    <p>We received a request to reset your password. If this was you, click the button below:</p>
    <a href="${resetDetails.resetLink}" class="reset-btn">Reset Password</a>
    <p>If you did not request this, you can safely ignore this email.</p>
  </div>
</body>
</html>
`;
exports.passwordResetRequestedTemplate = passwordResetRequestedTemplate;
