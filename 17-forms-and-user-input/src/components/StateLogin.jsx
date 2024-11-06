import { useState } from "react";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // indicating whether input fields were edited and therefore focus was lost
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
   didEdit.email && !enteredValues.email.includes("@"); // validation during input

  // function handleEmailChange(event) {
  //   // function will be triggered on every value change on the connected input (every keystroke for e.g)
  //   setEnteredEmail(event.target.value);
  // }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevState) => ({
      ...prevState, // rest of the values should not be lost
      [identifier]: value, // dynamically accessing the name of the property when it is stored in the variale
    }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // preventing default browser behaviour

    console.log("Submitted"); // log is not visible because page is reloading after clicking login button. Also URL query parameters were added to the request. It is a problem because our server (which is a development server) is not prepared for dealing with that request that are automatically send on submission.

    // Also after we would deploy our app on some real server, that would be a server, that only aims to serve index.html file that is defined in the project - it still wouldn't be a server that is prepared to handle incoming form requests.

    console.log(enteredValues);
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevState) => ({
      ...prevState,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/* htmlfor is rect equivalent for 'for' in native html */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>PLease enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        {/* Buttons inside a form will by default submit a form (generate a request), so HTTP requsest is created and is sent to the server that serves a website - that's a built in behaviour. So in our app it is a problem, unless we are using some full stack react solutions like NextJS.  */}
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
        {/* we can prevent that auto submitting by adding property type='button' */}
      </p>
    </form>
  );
}
