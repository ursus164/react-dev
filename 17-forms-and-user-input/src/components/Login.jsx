import { useRef } from "react";

export default function Login() {
  // second approach of handling user inputs is via refs - it requires less code than when using state. We did not add any value props, onChange etc...

  // Downside of this approach is that resetting those values below is a little bit harder.
  // We should not do it directly -> email.current.value = ' ' - it is not recommended.
  // Also we will have quite a lot of refs if we have a more complex form. So setting all refs and connecting them to DOM elements can take some time
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault(); // preventing default browser behaviour

    const enteredEmail = email.current.value; // current holds actual connected values
    const enteredPassword = password.current.value;

    console.log(enteredEmail,enteredPassword)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/* htmlfor is rect equivalent for 'for' in native html */}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          {/* By setting ref prop, connection will be established between DOM element below, and the ref above */}
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
