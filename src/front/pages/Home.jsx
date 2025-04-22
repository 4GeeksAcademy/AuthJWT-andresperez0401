import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   // Cuando cambie token, vamos al dashboard y mostramos alerta
	useEffect(() => {
		if (store.token) {
			alert("¡Login exitoso!");
			navigate("/private");
		}
	}, [store.token, navigate]);

	// Cuando haya error, limpiarlo después de 5s
	useEffect(() => {
		if (store.error) {
	//		alert(store.error);
			setTimeout(() => dispatch({ type: 'clear_error' }), 3000);
		}
	}, [store.error, dispatch]);


  //Manejo del boton enviar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      dispatch({ type: 'login_error', payload: "Todos los campos son requeridos" });
      return;
    }

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );
      const data = await resp.json();

      if (!resp.ok) throw new Error(data.msg || "Error de autenticación");

      // dispatch exitoso
      dispatch({
        type: "login_success",
        payload: {
          token: data.token,
          user: { email, id: data.user_id }
        }
      });

    } catch (err) {
      dispatch({ type: "login_error", payload: err.message });
	  
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              
              {store.error && (
                <div className="alert alert-danger">{store.error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                >
                  Ingresar
                </button>

                <div className="text-center">
                  <Link to="/register" className="btn btn-link">
                    Crear nueva cuenta
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};