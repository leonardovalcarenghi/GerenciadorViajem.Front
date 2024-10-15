import { useState } from "react"
import axios from "axios";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login() {
        setError(null);
        setLoading(true);

        try {
            const result = await axios.post('/auth/login', { email, senha });
            console.log('--------------------> login', result);

            localStorage["authorization"] = result.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;

            const urlParams = new URLSearchParams(window.location.search);
            const redirectTo = urlParams.get('redirectTo') || "/";
            window.location.href = redirectTo;


        } catch (error) {
            setError(error?.response?.data?.error || error.message);
        }

        setLoading(false);
    }


    return (
        <>
            <div className="container">
                <div class="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-auto">
                        <div className="card shadow-lg" style={{ width: "22rem" }}>
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">Login</h5>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Digite seu email"
                                        required
                                        disabled={loading}
                                        value={email}
                                        onChange={({ target }) => setEmail(target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="senha"
                                        placeholder="Digite sua senha"
                                        required
                                        disabled={loading}
                                        value={senha}
                                        onChange={({ target }) => setSenha(target.value)}
                                        onKeyDownCapture={(e) => {
                                            if (e.key == 'Enter') login();
                                        }}
                                    />
                                </div>

                                {error && <div className="mb-3"><p>{error}</p></div>}

                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-primary" disabled={loading} onClick={login}>
                                        {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}
                                        {loading ? "Entrando..." : "Entrar"}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}