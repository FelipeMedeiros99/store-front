import styled from "styled-components"
import { IoMdMenu } from "react-icons/io";



export default function Header({setTelaLateralAtiva}) {
    return (
        <HeaderStyle>
            <h1>STORE</h1>
            <div className="container-icone" onClick={()=>setTelaLateralAtiva(true)}>
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
    z-index: 2;
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


    .container-icone{
        position: absolute;
        display: flex;
        align-items: center;
        height: 50px;
        right: 15px;
    }


`