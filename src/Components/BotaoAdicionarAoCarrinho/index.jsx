import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function BotaoAdicionarAoCarrinho({id, token}){
    
    // state
    const [botaoInativo, setBotaoInativo] = useState(false)
    
    // vars
    const navigate = useNavigate()

    async function adicionarAoCarrinho(){
        try{
            setBotaoInativo(true)
            const produto = {
                idProduto: id
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            const resposta = await axios.put("https://store-back-0hxp.onrender.com/adicionar-carrinho", produto, config)
            alert(resposta.data)
        }catch(e){
            alert(`${e.response.data}`)
            navigate("/")
        }
        setBotaoInativo(false)
    }

    return (
        <div className="container-botao">
            <button disabled={botaoInativo} onClick={()=>adicionarAoCarrinho()}>Add</button>
        </div>
    )
}


