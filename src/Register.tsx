import { createRef } from "react"
import { userService } from "./fake-backend/user";

function Register() {

  const nameRef = createRef<HTMLInputElement>();
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  return (
    <>
      <h1 className='text'>Register</h1>
      <input type="text" ref={nameRef} placeholder="Namn" />
      <input type="text" ref={usernameRef} placeholder="Användarnamn" />
      <input type="text" ref={passwordRef} placeholder="Lösenord" />
      <button type="button" onClick={() => {
        const name = nameRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!name || !username || !password) return; // TODO: error handling

        userService.register({ name, username, password });
      }}>Register</button>
    </>
  )
}

export default Register
