import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Cabecalho() {

    const navigate = useNavigate();

    return (

        <header
            style={{
                background: "#2563EB",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                width: "100%"
            }}
        >

            <img src={Logo} alt="Hazuni Care" style={{ height: "50px", width: "auto" }} />

            <div style={{ flex: 1 }} />

            <button
                onClick={() => navigate("/home")}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "15px"
                }}
            >
                ← Voltar
            </button>

        </header>

    );

}