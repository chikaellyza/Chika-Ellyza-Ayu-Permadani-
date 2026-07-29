import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        if(email === "admin@gmail.com" && password === "12345"){

            localStorage.setItem("token", "loginberhasil");

            navigate("/dashboard");

        } else {
            alert("Email atau password salah");
        }
};


return (
    <div>
        <h2>Login</h2>

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button onClick={handleLogin}>
            login
        </button>
    </div>
);
}

export default Login;