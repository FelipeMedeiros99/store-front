import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BsCartCheck } from "react-icons/bs";
import SpinLoader from "../SpinLoader"

import RenderizarInputs from "../../Tools/RenderInput"
import LoginCadastroStyle from "../../StyleComponents/LoginCadastroStyle"


export default function TelaCadastro() {
    // states 
    const [inputs, setInputs] = useState({ "Nome": "", "Email": "", "Senha": "", "Confirmar senha": "" })
    const [mensagemErro, setMensagemErro] = useState({visivel: false, mensagem:""})
    const [aguardandoRequisicao, setAguardandoRequisicao] = useState(false)

    // vars
    const tipos = ["text", "email", "password", "password"]
    const minimos = [3, 7, 6, 6]
    const obrigatorio = [true, true, true, true]
    const inputsProps = {estado: inputs, setEstado: setInputs, tipos: tipos, minimos: minimos, obrigatorio: obrigatorio, aguardandoRequisicao: aguardandoRequisicao}
    const navigate = useNavigate()

    // functions
    async function submissao(e){
        e.preventDefault()

        // organizando dados
        const dadosUsuario = {
            "nome": inputs.Nome,
            "email": inputs.Email,
            "senha": inputs.Senha,
            "confirmar": inputs["Confirmar senha"]
        }

        if(dadosUsuario.senha!==dadosUsuario.confirmar){
            setMensagemErro({visivel: true, mensagem:"As senhas não coincidem"})
            return
        }
        // enviando para o servidor
        try{
            // desativando inputs e botoes
            setAguardandoRequisicao(true)
            const resposta = await axios.post("https://store-back-0hxp.onrender.com/cadastro", dadosUsuario)
            console.log(resposta)  
            setMensagemErro({visivel: false, mensagem: ""});
            if(resposta.status===201){
                alert("Cadastro feito com sucesso!")
                navigate("/login")
            }
        }catch(e){
            const respostaErro = e.response.data;
            setMensagemErro({visivel: true, mensagem: respostaErro});
        }
        // reativando inputs e botoes
        setAguardandoRequisicao(false)
    }


    return (
        <LoginCadastroStyle onSubmit={(e)=>submissao(e)}>
            
            <h1>STORE <BsCartCheck className="icone-carrinho"/></h1>
            <RenderizarInputs {...inputsProps}/>
            {mensagemErro.visivel?<p>{mensagemErro.mensagem}</p>:<></>}
            <button type="submit" disabled={aguardandoRequisicao}>
                {aguardandoRequisicao?
                <SpinLoader/>
                :
                "Cadastrar"
                }
            </button>
            
            <Link to={"/login"}>Já possui conta? Faça login!</Link>
        </LoginCadastroStyle>
    )
}
