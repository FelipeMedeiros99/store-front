import styled from "styled-components"
import { IoMdMenu } from "react-icons/io";
import { useContext } from "react";
import Contexto from "../../context";
import { BsCartCheck } from "react-icons/bs";


export default function Header(){
    const {setBarraLateralAtiva} = useContext(Contexto)
    return (
        <HeaderStyle>
            <h1>STORE <BsCartCheck /></h1>
            <div className="container-icone" onClick={()=>setBarraLateralAtiva(true)}>
                <IoMdMenu/>
            </div>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 4;
    background-color: #1A1FBC;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 30px;

    :hover{
        cursor: pointer;
    }

    h1{
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 140px;
    }

    svg{
        font-size: 27px;
    }


    .container-icone{
        position: absolute;
        display: flex;
        align-items: center;
        height: 50px;
        right: 15px;
    }


`