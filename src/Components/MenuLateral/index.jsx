import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MenuLateral({setTelaLateralAtiva}){
    // vars 
    const navigate = useNavigate()
    const dadosUsuario = JSON.parse(localStorage.store)
    console.log(dadosUsuario)
    return(
        <MenuLateralStyle>
            <div className="container-conteudo">
                <div className="topo">
                    <IoCloseOutline onClick={()=>setTelaLateralAtiva(false)}/>
                    <CiLogout onClick={()=>navigate('/')}/>
                </div>
                <h2>Olá </h2>
                <div className="links">
                    <Link to="/home">Home</Link>
                    <Link to="/carrinho">Carrinho</Link>
                </div>

                

            </div>
        </MenuLateralStyle>
    )
}

const MenuLateralStyle = styled.nav`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #c4c4c49d;
    z-index: 3;
    .container-conteudo{
        position: fixed;
        right: 0;
        width: 100%;
        max-width: 250px;
        height: 95%;
        z-index: 4;
        background-color: #ffffff;
    }

    .topo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        font-size: 30px;
        box-shadow: 0 1px 0 #969696;
    }

    svg{
        height: 100%;
        width: 30px;
        margin: 0 5px 0 5px;
    }

    svg:hover{
        cursor: pointer;
    }

    .links{
        display: flex;
        flex-direction: column;
    }
`