import { useState } from "react";
import styled from "styled-components";

import JanelaProduto from "../JanelaProduto";
import RenderProdutos from "../RenderProdutos";
import Header from "../Header";

export default function TelaHome() {
    // states 
    const [janelaProdutoAtiva, setJanelaProdutoAtiva] = useState(false);
    const [produtoEmDestaque, setProdutoEmDestaque] = useState({});

    // vars
    const dadosRecebidos = JSON.parse(localStorage.store);
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
            <Header />
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
