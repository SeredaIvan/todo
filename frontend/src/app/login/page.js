


const handleLogin=()=>{

}

const Login = () => {


    return (
        <div>
            <h2>Login</h2>
            <form >
                <div>
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
