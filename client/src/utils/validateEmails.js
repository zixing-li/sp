const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => { // exporting this arrow function
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false); // if valid return false, if invalid return true and will be caught by the array
  // emailregex.com 
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};