import styled from "styled-components";

import BotaoAdicionarAoCarrinho from "../BotaoAdicionarAoCarrinho";


export default function RenderProdutos({ propsRenderProdutos }) {

    // vars
    const { produtos, setJanelaProdutoAtiva, setProdutoEmDestaque, token } = propsRenderProdutos;

    // functions
    function ativarJanelaDeProdutos(produto) {
        setJanelaProdutoAtiva(true)
        setProdutoEmDestaque(produto)
    }

    // components
    function ContainerImagem({produto}) {
        const { imagem, descricao } = produto;
        return (
            <div className="container-imagem">
                <img src={imagem} alt={descricao} className="" />
            </div>
        )
    }

    function Preco({preco}){
        return(
            <h2>R${String(preco.toFixed(2)).replace(".", ",")}</h2>
        )
    }

    function Descricao({descricao}){
        return(
            <p>{descricao.slice(0, 73)}...</p>
        )
    }

    return (
        produtos.map((produto) => {
            const { nome, imagem, id, descricao, especificacoes, preco } = produto;
            
            return (
                <StyleRenderProdutos key={id} >

                    <ContainerInformacoesProduto onClick={() => ativarJanelaDeProdutos(produto)}>
                        <ContainerImagem produto={produto}/>
                        <Preco preco={preco}/>
                        <Descricao descricao={descricao}/>
                    </ContainerInformacoesProduto>
                    
                    <BotaoAdicionarAoCarrinho id={id} token={token}/>

                </StyleRenderProdutos>
            )
        })
    )
}


const StyleRenderProdutos = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 175px;
    height: 235px;
    border-radius: 35px;
    margin: 10px;
    padding: 10px 10px 35px 10px;
    position: relative;
    background-color: white;
    box-shadow: 0px 1px 3px #0000009c;
    

    
    
    :hover{
        cursor: pointer;
    }

    .container-botao{
        display: flex;
        justify-content: center;
        width: 100%;

        position: absolute;
        bottom: 10px;

    }
`

const ContainerInformacoesProduto= styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    p{
        font-size: 12px;
        width: 100%;
    }

    h2{
        text-align: center;
        width: 100%;
        font-size: 20px;
        margin-bottom: 20px;
    }

    .container-imagem{
        height: 100px;
    }

    img{
        width: auto;
        height: 100%;
    }
`