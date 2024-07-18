import { useState } from "react";
import styled from "styled-components";

import JanelaProduto from "../JanelaProduto";
import RenderProdutos from "../RenderProdutos";

export default function TelaHome() {
    // states 
    const [janelaProdutoAtiva, setJanelaProdutoAtiva] = useState(false);
    const [produtoEmDestaque, setProdutoEmDestaque] = useState({});

    // vars
    const dadosRecebidos = JSON.parse(localStorage.store);
    const { produtos, token } = dadosRecebidos;
    const propsRenderProdutos = {produtos, setJanelaProdutoAtiva, setProdutoEmDestaque};
   
    return (
        <MainStyle >
            <RenderProdutos propsRenderProdutos={propsRenderProdutos}/>
            {janelaProdutoAtiva?<JanelaProduto produtoEmDestaque={produtoEmDestaque}/>:<></>}
        </MainStyle>
    )
}

const MainStyle = styled.main`
    display: flex;
    flex-wrap: wrap;    
`
