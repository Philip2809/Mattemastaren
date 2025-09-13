import { createRef, use } from "react"
import { userService } from "./fake-backend/user";

function Login() {

  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  return (
    <>
      <h1 className='text'>Login</h1>
      <input type="text" ref={usernameRef} placeholder="Användarnamn" />
      <input type="text" ref={passwordRef} placeholder="Lösenord" />
      <button type="button" onClick={async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) return; // TODO: error handling

        const token = await userService.login(username, password);
        if (!token) return; // TODO: error handling
        localStorage.setItem("token", token);
      }}>Login</button>
    </>
  )
}

export default Login
