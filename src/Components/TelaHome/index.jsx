import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import JanelaProduto from "../JanelaProduto";
import RenderProdutos from "../RenderProdutos";
import Header from "../Header";
import MenuLateral from "../MenuLateral";

export default function TelaHome() {
    const navigate = useNavigate()
    // states 
    const [janelaProdutoAtiva, setJanelaProdutoAtiva] = useState(false);
    const [produtoEmDestaque, setProdutoEmDestaque] = useState({});
    const [telaLateralAtiva, setTelaLateralAtiva] = useState(false)
    const [dadosRecebidos, setDadosRecebidos] = useState(null)
    
    useEffect(()=>{
        const validarDadosRecebidos = localStorage.getItem("store")
        if(validarDadosRecebidos===null){
            navigate("/")
        }else{
            setDadosRecebidos(JSON.parse(validarDadosRecebidos))
        }
    }, [])
    
    if(!dadosRecebidos){
        return(
            <>
                carregando...
            </>
        )
    }

    // vars
    const { produtos, token } = dadosRecebidos;
    const propsRenderProdutos = {produtos, setJanelaProdutoAtiva, setProdutoEmDestaque, token};


    // functions 
    function RenderJanelaProduto(){
        return(
            janelaProdutoAtiva && <JanelaProduto 
                produtoEmDestaque={produtoEmDestaque}
                setJanelaProdutoAtiva={setJanelaProdutoAtiva}
                token={token}
                />
        )
    }

    return (
        <>
            <Header setTelaLateralAtiva={setTelaLateralAtiva}/>
            {telaLateralAtiva && <MenuLateral setTelaLateralAtiva={setTelaLateralAtiva}/>}
            <MainStyle >
                <RenderProdutos propsRenderProdutos={propsRenderProdutos}/>
                <RenderJanelaProduto />
            </MainStyle>
        </>
    )
}

const MainStyle = styled.main`
    display: flex;
    flex-wrap: wrap;    
    margin-top: 60px;
`
