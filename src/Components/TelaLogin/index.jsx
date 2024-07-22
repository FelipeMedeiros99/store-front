import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import SpinLoader from "../SpinLoader"
import { BsCartCheck } from "react-icons/bs";

import LoginCadastroStyle from "../../StyleComponents/LoginCadastroStyle"
import RenderizarInputs from "../../Tools/RenderInput"

export default function TelaLogin() {
    // states 
    const [inputs, setInputs] = useState({ "Email": "", "Senha": "" })
    const [mensagemErro, setMensagemErro] = useState({visivel: false, mensagem:""})
    const [aguardandoRequisicao, setAguardandoRequisicao] = useState(false)

    // vars
    const tipos = ["email", "password"]
    const minimos = [7, 6]
    const obrigatorio = [true, true]
    const inputsProps = {estado: inputs, setEstado: setInputs, tipos: tipos, minimos: minimos, obrigatorio: obrigatorio, aguardandoRequisicao: aguardandoRequisicao}
    const navigate = useNavigate()
   
    // functions
    async function submissao(e){
        e.preventDefault()

        // organizando dados
        const dadosUsuario = {
            "email": inputs.Email,
            "senha": inputs.Senha
        }

        // enviando para o servidor
        try{
            // desativando inputs e botoes
            setAguardandoRequisicao(true)
            const resposta = await axios.post("https://store-back-0hxp.onrender.com/login", dadosUsuario)
            setMensagemErro({visivel: false, mensagem: ""});
            if(resposta.status===200){ 
                // salvando dados no localStorage
                localStorage.setItem("store", JSON.stringify(resposta.data))
                navigate("/home")
            }
        }catch(e){
            const respostaErro = e.response.data;
            setMensagemErro({visivel: true, mensagem: respostaErro});
        }
        // reativando inputs e botoes
        setAguardandoRequisicao(false)
    }

    function limparDados(){
        localStorage.removeItem("store")
    }

    limparDados()

    return (
        <LoginCadastroStyle onSubmit={(e)=>submissao(e)}>
            
            <h1>STORE <BsCartCheck className="icone-carrinho"/></h1>
            <RenderizarInputs {...inputsProps}/>
            {mensagemErro.visivel?<p>{mensagemErro.mensagem}</p>:<></>}
            <button type="submit" disabled={aguardandoRequisicao}>
                {aguardandoRequisicao?
                <SpinLoader/>
                :
                "Login"
                }
            </button>

            
            <Link to={"/cadastro"}>Não possui conta? Cadastre-se!</Link>
        </LoginCadastroStyle>
    )
}
