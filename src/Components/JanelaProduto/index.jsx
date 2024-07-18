import styled from "styled-components"

export default function JanelaProduto({produtoEmDestaque}){
    const { nome, imagem, id, descricao, especificacoes, preco } = produtoEmDestaque
    return(
        <StyleJanelaProduto>
            <div className="container-imagem-2">
                <img src={imagem} alt={descricao} className="" />
            </div>
            <div className="container-informacoes-2">
                <h2 className="titulo">{nome}</h2>
                <p className="preco">{preco}</p>
                <ul>
                    {especificacoes.map((especificacao)=><li>{especificacao}</li>)}
                </ul>
                <div className="container-botao">
                    <button>Add</button>
                </div>
            </div>
        </StyleJanelaProduto>
        
    )
}


const StyleJanelaProduto = styled.div`

    position: fixed;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;

    .container-imagem-2{
        height: 200px;
    }

    ul{
        overflow-y: scroll;
        height: 110px;
    }

    .preco{
        font-size: 20px;
    }

    .container-botao{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container-botao button{

    }

`