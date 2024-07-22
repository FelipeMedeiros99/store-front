import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import JanelaProduto from "../JanelaProduto";
import RenderProdutos from "../RenderProdutos";
import Header from "../Header";
import MenuLateral from "../MenuLateral";
import Contexto from "../../context";

export default function TelaHome() {
    // states 
    const navigate = useNavigate()
    const [janelaProdutoAtiva, setJanelaProdutoAtiva] = useState(false);
    const [produtoEmDestaque, setProdutoEmDestaque] = useState({});
    const [dadosRecebidos, setDadosRecebidos] = useState(null)
    const {setPaginaAtual} = useContext(Contexto)
    

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

    // informando a barra lateral a página atual
    setPaginaAtual('home')

    return (
        <>
            <Header />
            <MenuLateral/>
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
    justify-content: center;
    margin: 100px 30px 0 30px;
`
