import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";

import Header from "../Header"
import MenuLateral from "../MenuLateral";

export default function TelaCarrinho() {
    // states 
    const navigate = useNavigate()
    const [elementosCarrinho, setElementosCarrinho] = useState([])
    const [dadosRecebidos, setDadosRecebidos] = useState(null)
    const [checkBox, setCheckBox] = useState([])
    const [quantidadeProdutos, setQuantidadeProdutos] = useState([])
    const [precoTotal, setPrecoTotal] = useState(0)
    const [botaoFecharPedidoInativo, setBotaoFecharPedidoInativo] = useState(true)
    // vars

    // efeitos 
    useEffect(() => {
        // indo para tela de login em caso de não haver dados
        const validarDadosRecebidos = localStorage.getItem("store")
        if (validarDadosRecebidos === null) {
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

    useEffect(()=>{
        // calcula o preço total
        if(checkBox.length>0){
            calculaPrecoTotal()
        }
    },[checkBox, quantidadeProdutos])

    useEffect(()=>{
        // ativa botao de fechar pedido
        setBotaoFecharPedidoInativo(true)
        const haCheckBoxAtivo = checkBox.includes(true)
        if(haCheckBoxAtivo){
            setBotaoFecharPedidoInativo(false)
        }

    }, checkBox)



    // functions

    function mudarQtProduto(index, valor){
        const copia = [...quantidadeProdutos]
        copia[index] += valor
        if(copia[index] < 1){
            copia[index] = 1
        }
        setQuantidadeProdutos(copia)
    }  

    function calculaPrecoTotal(){
        // atualiza o preço total da compra em tempo real

        setPrecoTotal(0)
        checkBox.map((confirmacao, index)=>{
            if (confirmacao){
                let copiaPreco = precoTotal;
                copiaPreco = elementosCarrinho[index].preco * quantidadeProdutos[index]
                setPrecoTotal(copiaPreco)
            }
        })
    }

    async function removerDoCarrinho(id){
        const config = {
            headers: {
                Authorization: `Bearer ${dadosRecebidos?.token}`
            },
            data: {
                idProduto: id
            }
        }
        try{
            
            await axios.delete("https://store-back-0hxp.onrender.com/remover-carrinho", config)
            setDadosRecebidos({...dadosRecebidos})
        }catch(e){
            console.log(e.response)
            alert(e.response.data)
        }
    }

    async function fecharPedido(){
        const config = {
            headers: {
                Authorization: `Bearer ${dadosRecebidos?.token}`
            }
        }
        
        elementosCarrinho.map((elemento, index)=>{
            if(checkBox[index]){
                removerDoCarrinho(elemento.id)
            }
        })
        alert("compra finalizada!")
        navigate("/home")

    }

    // componentes 
    function Rodape(){
        return(
            <RodapeStyle >
                <p>Sub-Total: <span>{precoTotal}</span></p>
                <button onClick={fecharPedido} disabled={botaoFecharPedidoInativo}>Fechar pedido</button>
            </RodapeStyle> 
        )
    }


    return (
        <>
            <Header />
            <MenuLateral />
            <TelaCarrinhoStyle>

                {elementosCarrinho.length===0?
                    <p>seu carrinho está vazio ;(</p>
                    :
                    elementosCarrinho.map((produto, index)=>{
                    return (
                        <ContainerProduto key={index}>
                            <div className="container-icone" onClick={()=>removerDoCarrinho(produto.id)}>
                                <FaRegTrashAlt />
                            </div>
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
                                <p>R${String(produto.preco.toFixed(2)).replace(".", ",")}</p>
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
            <Rodape />
        </>
    )
}

const TelaCarrinhoStyle = styled.div`
    padding: 50px 0 50px 0;
    `

const ContainerProduto = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    margin: 10px 0 10px 0;
    border-radius: 5px;
    height: 150px;
    width: 100%;
    max-width: 500px;
    overflow-x: hidden;
    .container-icone{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 3;
        font-size: 15px;
    }
    .container-icone:hover{
        cursor:pointer;
    }
`

const ContainerImagem = styled.div`
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

const ContainerDescricaoEBotoes = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 30px 10px 0 10px;

    p{
        height: 100%;
        max-height: 80px;
        overflow-y: auto;
    }

    .botoes{
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        width: 100%;    
    }
`


const RodapeStyle = styled.footer`
    position: fixed;
    bottom: 0;
    height: 50px;
    background-color: #1A1FBC;
    width: 100%;
    display: flex;
    justify-content: space-between  ;
    align-items: center;
    padding: 0 15px 0 15px;
`