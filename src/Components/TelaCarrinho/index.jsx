import { useState, useEffect } from "react";

import MenuLateral from "../MenuLateral";
import Header from "../Header"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function TelaCarrinho() {
    // states 
    const navigate = useNavigate()
    const [elementosCarrinho, setElementosCarrinho] = useState([])
    const [dadosRecebidos, setDadosRecebidos] = useState(null)
    const [checkBox, setCheckBox] = useState([])
    const [quantidadeProdutos, setQuantidadeProdutos] = useState([])
    // vars

    // indo para tela de login em caso de não haver dados
    useEffect(() => {
        const validarDadosRecebidos = localStorage.getItem("store")
        if (validarDadosRecebidos === null) {
            navigate("/")
        } else {
            setDadosRecebidos(JSON.parse(validarDadosRecebidos))
        }
    }, [])

    // buscando dados do carrinho
    useEffect(() => {
        async function buscarDadosDoCarrinho() {
            try {
                if (dadosRecebidos !== null) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${dadosRecebidos?.token}`
                        }
                    }
                    const resposta = await axios.get("https://store-back-0hxp.onrender.com/produtos-carrinho", config)
                    setElementosCarrinho([...resposta.data])
                    const tamanhoResposta = resposta.data.length
                    setCheckBox(new Array(tamanhoResposta).fill(false))
                    setQuantidadeProdutos(new Array(tamanhoResposta).fill(0))
                }
            } catch (e) {
                alert(e.response.data)
                navigate("/login")
            }
        }
        buscarDadosDoCarrinho()
    }, [dadosRecebidos])

    function mudarQtProduto(index, valor){
        const copia = [...quantidadeProdutos]
        copia[index] += valor
        if(copia[index] < 0){
            copia[index] = 0
        }
        setQuantidadeProdutos(copia)
    }  

    console.log(elementosCarrinho)

    return (
        <>
            <Header />
            <MenuLateral />
            <TelaCarrinhoStyle>
                {elementosCarrinho.length===0?
                    <p>Você não adicionou nada ao carrinho</p>
                    :
                    elementosCarrinho.map((produto, index)=>{
                    return (
                        <ContainerProduto key={index}>
                            <input 
                                type="checkbox" 
                                checked={checkBox[index]}
                                onChange={(e)=>{
                                    const copiaCheckbox = [...checkBox]
                                    copiaCheckbox[index] = e.target.checked
                                    setCheckBox(copiaCheckbox)
                                }}
                            />
                            <ContainerImagem>
                                <img src={produto.imagem} alt={produto.descricao} />
                                <p>{produto.preco}</p>
                            </ContainerImagem>

                            <ContainerDescricaoEBotoes >
                                <p>{produto.descricao}</p>
                                <div className="botoes">
                                    <button onClick={()=>mudarQtProduto(index, -1)}>-</button>
                                    <button>{quantidadeProdutos[index]}</button>
                                    <button onClick={()=>mudarQtProduto(index, 1)}>+</button>
                                </div>
                            </ContainerDescricaoEBotoes>
                        </ContainerProduto>
                    )
                    })
                }
            </TelaCarrinhoStyle>
        </>
    )
}

const TelaCarrinhoStyle = styled.div`
    margin-top: 100px;   
    `

const ContainerProduto = styled.div`
    
    display: flex;
    align-items: center;
    width: 100%;
    background-color: aliceblue;
    margin: 10px;
    border-radius: 5px;
    height: 200px;
    width: 100%;
    max-width: 500px;
`

const ContainerImagem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 200px;
    }
`

const ContainerDescricaoEBotoes = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    p{
        height: 100%;
        max-height: 100px;
        overflow-y: scroll;
    }

    .botoes{
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        width: 100%;    
    }
`