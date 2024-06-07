const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("loginform handler does a thing!");
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log("returning email and password variables", email, password);

    if (email && password) {
      console.log("we have both email & password!");
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log("Response was ok");
        // If successful, redirect the browser to the dashBoard page
        document.location.replace('/dashBoard')
        // Reload the page after a short delay
      // setTimeout(() => {
      //   document.location.reload();
      // }, 100); // adjust the delay as needed
      } else {
        alert(response.statusText);
      }
    } else {
      console.log("We didn't get both email and pw :(");
    }
  };
  
  const signupFormHandler = async (event) => {
    console.log("We got the signup form handler function to do anything!");
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log("name, email password signup", name, email, password);

    if (name && email && password) {
      if (password.length < 8) {
        // Password is too short, notify the user
        alert('Password must be at least 8 characters long');
        return;
      }

      console.log("There was a name email and password!");
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("Response was ok");
        document.location.replace('/dashBoard');
      } else {
        alert(response.statusText);
      }
    } else {
      console.log("Did not have name, email and password");
    }
};
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  