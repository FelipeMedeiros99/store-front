import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components"

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
        <BotaoStyle>
            <button disabled={botaoInativo} onClick={()=>adicionarAoCarrinho()}>Add</button>
        </BotaoStyle>
    )
}

const BotaoStyle = styled.div`
    position: absolute;
    bottom: 10px;
    button{
        background-color: #6FBC1A;
        border: none;
        box-shadow: 0 0 3px #0000007b;
        color: white;
        border-radius: 30px;
        width: 70px;
        height: 30px;
 }
`