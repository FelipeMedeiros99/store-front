import styled from "styled-components";

export default function RenderProdutos({propsRenderProdutos}) {
    const {produtos, setJanelaProdutoAtiva, setProdutoEmDestaque} = propsRenderProdutos;
    return (
        produtos.map((produto) => {
            const { nome, imagem, id, descricao, especificacoes, preco } = produto
            return (
                <StyleRenderProdutos key={id} >
                    <div className="container-informacoes" onClick={()=>{

                    setJanelaProdutoAtiva(true)
                    setProdutoEmDestaque(produto)
                    }}>
                        <div className="container-imagem">
                            <img src={imagem} alt={descricao} className="" />
                        </div>
                        <h2>R${String(preco.toFixed(2)).replace(".", ",")}</h2>
                        <p>{descricao.slice(0, 73)}...</p>
                    </div>
                    <button>Add</button>
                    
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
    height: 225px;
    border-radius: 5px;
    margin: 5px;
    padding: 10px 10px 35px 10px;
    position: relative;
    border: solid 1px;
    

    .container-informacoes{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

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

    button{
        position: absolute;
        bottom: 10px;
    }

`