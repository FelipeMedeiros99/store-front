import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Contexto from "../../context";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

export default function MenuLateral() {
    // ---------------- states --------------------------
    const navigate = useNavigate()
    const { barraLateralAtiva, setBarraLateralAtiva } = useContext(Contexto);
    const [dadosUsuario, setDadosUsuario] = useState(null);
    const {paginaAtual} = useContext(Contexto)
    
    // ----------------- vars ----------------------------
    const nomeUser = `${dadosUsuario?.nome[0].toUpperCase()}${dadosUsuario?.nome?.slice(1, )}`

    // ------------------- effects -------------------------

    // buscando dados do usuário
    useEffect(()=>{
        const dados = localStorage.getItem("store")
        if(!dados){
            navigate("/")
        }else(
            setDadosUsuario(JSON.parse(dados)?.dadosUsuarioBanco)
        )
    },[])


    // --------------------- components ----------------------
    function Topo(){
        return(
            <TopoStyle>
                <IoCloseOutline onClick={() => setBarraLateralAtiva(false)} />
                <CiLogout onClick={() => navigate('/')} />
            </TopoStyle>
        )
    }

    function LinksInternos(){
        const classeHome = paginaAtual==='home'?"atual":""
        const classeCarrinho = paginaAtual==='carrinho'?"atual":""
        return(
            <LinksInternosStyle>
                <Link 
                    to="/home" 
                    className={classeHome} 
                    onClick={()=>setBarraLateralAtiva(false)}>Home <IoStorefrontOutline /></Link>
                
                <Link 
                    to="/carrinho" 
                    className={classeCarrinho} 
                    onClick={()=>setBarraLateralAtiva(false)}>Carrinho <IoCartOutline /></Link>
            </LinksInternosStyle>

        )
    }

    function ContainerConteudo(){
        return(
            <ContainerConteudoStyle>
                <Topo />
                <H2Style>Olá, {nomeUser}!</H2Style>
                <LinksInternos />
            </ContainerConteudoStyle>
        )
    }


    if(barraLateralAtiva){
        return (
            <MenuLateralStyle>
                <ContainerConteudo />
            </MenuLateralStyle>
        )
    }
}


const MenuLateralStyle = styled.nav`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #c4c4c49d;
    z-index: 4;
`

const ContainerConteudoStyle = styled.div`
    position: fixed;
    right: 0;
    width: 100%;
    max-width: 250px;
    height: 95%;
    z-index: 4;
    background-color: #ffffff;

    svg{
        height: 100%;
        width: 30px;
        margin: 0 5px 0 5px;
    }

    svg:hover{
        cursor: pointer;
    }

`

const TopoStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-size: 30px;
    box-shadow: 0 1px 0 #969696;    
`

const H2Style = styled.h2`
    font-size: 25px;
    text-align: center;
    margin: 10px 0 20px 0;
`

const LinksInternosStyle = styled.div`
    display: flex;
    flex-direction: column;
    a{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px 0 15px;
        font-size: 22px;
        color: black;
        text-decoration: none;
        height: 35px;
    }
    .atual{
        background-color: #F6F3F3;
    }

    svg{
        width: 25px;
    }
`