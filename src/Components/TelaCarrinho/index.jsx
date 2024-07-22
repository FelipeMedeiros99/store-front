import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

import Header from "../Header"
import MenuLateral from "../MenuLateral";
import Rodape from "../Rodape";
import Contexto from "../../context";

export default function TelaCarrinho() {
    // -------------------- states ----------------------

    const navigate = useNavigate()
    const [elementosCarrinho, setElementosCarrinho] = useState([])
    const [dadosRecebidos, setDadosRecebidos] = useState(null)
    const [checkBox, setCheckBox] = useState([])
    const [quantidadeProdutos, setQuantidadeProdutos] = useState([])
    const [precoTotal, setPrecoTotal] = useState(0)
    const [botaoFecharPedidoInativo, setBotaoFecharPedidoInativo] = useState(true)
    const {setPaginaAtual} = useContext(Contexto)

    // -------------------- vars -------------------------
    const paramsRodape = {
        valor: precoTotal,
        funcaoFinalizar: fecharPedido,
        ativadorBotaoFechar: botaoFecharPedidoInativo
    }

    // ------------------ efeitos ---------------------------

    useEffect(() => {
        // indo para tela de login em caso de não haver dados
        const validarDadosRecebidos = localStorage.getItem("store")
        if (validarDadosRecebidos === null) {
            alert("Faça login novamente")
            navigate("/")
        } else {
            setDadosRecebidos(JSON.parse(validarDadosRecebidos))
        }
    }, [])


    useEffect(() => {
        // buscando dados do carrinho
        async function buscarDadosDoCarrinho() {
            try {
                if (dadosRecebidos !== null) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${dadosRecebidos?.token}`
                        }
                    }
                    const resposta = await axios.get("https://store-back-0hxp.onrender.com/produtos-carrinho", config)
                    setElementosCarrinho([...resposta?.data])
                    const tamanhoResposta = resposta?.data?.length
                    setCheckBox(new Array(tamanhoResposta).fill(false))
                    setQuantidadeProdutos(new Array(tamanhoResposta).fill(1))
                }
            } catch (e) {
                alert(e?.response?.data)
                navigate("/login")
            }
        }
        buscarDadosDoCarrinho()
    }, [dadosRecebidos])


    useEffect(() => {
        // calcula o preço total
        if (checkBox.length > 0) {
            calculaPrecoTotal()
        }
    }, [checkBox, quantidadeProdutos])


    useEffect(() => {
        // ativa botao de fechar pedido
        setBotaoFecharPedidoInativo(true)
        const haCheckBoxAtivo = checkBox.includes(true)
        if (haCheckBoxAtivo) {
            setBotaoFecharPedidoInativo(false)
        }

    }, checkBox)


    // -------------- functions -------------------
    function mudarQtProduto(index, valor) {
        const copia = [...quantidadeProdutos]
        copia[index] += valor
        if (copia[index] < 1) {
            copia[index] = 1
        }
        setQuantidadeProdutos(copia)
    }

    function calculaPrecoTotal() {
        // atualiza o preço total da compra em tempo real
        let soma = 0
        checkBox.map((estaMarcado, index) => {
            if (estaMarcado) {
                soma += elementosCarrinho[index].preco * quantidadeProdutos[index]
            }
        })
        setPrecoTotal(soma)
    }

    async function removerDoCarrinho(id) {
        const config = {
            headers: {
                Authorization: `Bearer ${dadosRecebidos?.token}`
            },
            data: {
                idProduto: id
            }
        }
        try {

            await axios.delete("https://store-back-0hxp.onrender.com/remover-carrinho", config)
            setDadosRecebidos({ ...dadosRecebidos })
        } catch (e) {
            alert(e.response.data)
        }
    }

    async function fecharPedido() {
        const config = {
            headers: {
                Authorization: `Bearer ${dadosRecebidos?.token}`
            }
        }

        elementosCarrinho.map((elemento, index) => {
            if (checkBox[index]) {
                removerDoCarrinho(elemento.id)
            }
        })
        alert("compra finalizada!")
        navigate("/home")

    }

    // ------------------ componentes ---------------------- 
    function ContainerIconeDeletar({ id }) {
        return (
            <ContainerIconeDeletarStyle onClick={() => removerDoCarrinho(id)}>
                <FaRegTrashAlt />
            </ContainerIconeDeletarStyle>
        )
    }

    function desmarcarCkeckBox(index) {
        let copia = [...checkBox];
        copia[index] = !copia[index];
        setCheckBox(copia)
    }

    function CheckBox({ index }) {
        if (checkBox[index]) {
            return (
                <CheckBoxStyle onClick={() => desmarcarCkeckBox(index)}>
                    <div className="container-checkbox marcado">
                        <IoMdCheckmark />
                    </div>
                </CheckBoxStyle>
            )
        }
        return (
            <CheckBoxStyle onClick={() => desmarcarCkeckBox(index)}>
                <div className="container-checkbox">
                </div>
            </CheckBoxStyle>
        )
    }

    function ContainerImagem({ produto }) {
        return (
            <ContainerImagemStyle>
                <img src={produto.imagem} alt={produto.descricao} />
                <p>R${String(produto.preco.toFixed(2)).replace(".", ",")}</p>
            </ContainerImagemStyle>
        )
    }

    function ContainerDescricao({ descricao, index }) {
        return (
            <ContainerDescricaoStyle >
                <p>{descricao}</p>
                <div className="botoes">
                    <button className="alterar-valor" onClick={() => mudarQtProduto(index, -1)}>-</button>
                    <button>{quantidadeProdutos[index]}</button>
                    <button className="alterar-valor" onClick={() => mudarQtProduto(index, 1)}>+</button>
                </div>
            </ContainerDescricaoStyle>
        )
    }

    function ProdutosCarrinho() {
        if (elementosCarrinho.length === 0) {
            return (
                <p>Seu carrinho está vazio ;(</p>
            )
        }
        return (
            elementosCarrinho.map((produto, index) => {
                const { descricao } = produto
                return (
                    <ContainerProdutoStyled key={index}>
                        <ContainerIconeDeletar id={produto.id} />
                        <CheckBox index={index} />
                        <ContainerImagem produto={produto} />
                        <ContainerDescricao descricao={descricao} index={index} />
                    </ContainerProdutoStyled>
                )
            })
        )
    }

    // informando a barra lateral a página atual
    setPaginaAtual("carrinho")
    

    return (
        <>
            <Header />
            <MenuLateral />
            <TelaCarrinhoStyle>
                <ProdutosCarrinho />
            </TelaCarrinhoStyle>
            <Rodape paramsRodape={paramsRodape} />
        </>
    )

}

const TelaCarrinhoStyle = styled.div`
    padding: 50px 0 50px 0;
    `

const ContainerProdutoStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    margin: 10px 0 10px 0;
    padding: 0 0 0 15px;
    border-radius: 30px;
    height: 150px;
    width: 100%;
    max-width: 500px;
    overflow-x: hidden;
`

const ContainerImagemStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;
    width: 100%;
    height: 100%;
    max-width: 200px;
    position: relative;

    img{
        height: 100px;
    }

    p{
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: 10px;

    }
`

const ContainerDescricaoStyle = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 320px;
    padding: 30px 25px 0 10px;

    p{
        height: 100%;
        text-align: justify;
        max-height: 80px;
        overflow-y: auto;
        width: 100%;
        max-width: 300px;
    }

    .botoes{
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        width: 100%;    
    }
    button{
        background-color: white;
        border: 1px solid #6d6d6d;
    }

    .alterar-valor:hover{
        cursor: pointer;
    }
`


const ContainerIconeDeletarStyle = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
    font-size: 15px;
    
    :hover{
        cursor:pointer;
    }
`

const CheckBoxStyle = styled.div`
    :hover{
        cursor: pointer;
    }
    .container-checkbox{
        width: 25px;
        min-width: 25px;
        height: 250x;
        min-height: 25px;
        border: 1px solid;
        z-index: 3;
    }
    
    .marcado{
        background-color: #6FBC1A;
    }

    svg{
        width: 100%;
        height: 100%;
        color: white;
    }
`   