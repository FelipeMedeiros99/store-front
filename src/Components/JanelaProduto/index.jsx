// modulos externos 
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

// modulos internos 
import adicionarAoCarrinho from "../../Tools/adicionarAoCarrinho";

export default function JanelaProduto({ produtoEmDestaque, setJanelaProdutoAtiva, token }) {
    // states
    const [botaoInativo, setBotaoInativo] = useState(false)
    const navigate = useNavigate()
    // vars
    const { nome, imagem, id, descricao, especificacoes, preco } = produtoEmDestaque;


    // Components
    function ContainerImagem() {
        return (
            <ContainerImagemStyle>
                <img src={imagem} alt={descricao} className="" />
            </ContainerImagemStyle>
        )
    }


    function IconeFechar(){
        return(
            <div className="icone-fechar" onClick={()=>setJanelaProdutoAtiva(false)}>
                <IoMdClose />
            </div>
        )

    }

    function ContainerInformacoes() {
        return (
            <ContainerInformacoesStyle>
                <IconeFechar />
                <h2 className="titulo">{nome}</h2>
                <p className="preco">R$ {String(preco.toFixed(2)).replace(".", ",")}</p>
                <ul>
                    {especificacoes.map((especificacao) => <li>{especificacao}</li>)}
                </ul>
                <div className="container-botao">
                    <button disabled={botaoInativo} onClick={(e, id)=>adicionarAoCarrinho(id, token)}>Add</button>
                </div>
            </ContainerInformacoesStyle>
        )
    }

    return (
        <StyleJanelaProduto>
            <ContainerImagem />
            <ContainerInformacoes />
        </StyleJanelaProduto>

    )
}


const ContainerImagemStyle = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    height: 100%;
    width: 100%;
    max-width: 200px;
    max-height: 400px;
    padding: 10px;
    img{
        width: 100%;
    } 
`

const ContainerInformacoesStyle = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 400px;
    padding: 30px 15px 15px 0;
    position: relative;

    .icone-fechar{
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 30px;
    }

    .icone-fechar:hover{
        cursor: pointer;
    }

    .titulo{
        font-size: 26px;
        font-weight: 700px;
        margin-bottom: 20px;
    }

    .preco{
        font-size: 26px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    ul{
        list-style-type: disc;
        overflow-y: scroll;
        height: 100%;
        width: 100%;
        margin-bottom: 30px;
        padding-left: 17px
    }

    li{
    }



    .container-botao{
        position: absolute;
        bottom: 20px;
        transform: translatex(-50%);
    }


`


const StyleJanelaProduto = styled.div`

    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ecececb9;
    height: 100%;
    width: 100%;

`