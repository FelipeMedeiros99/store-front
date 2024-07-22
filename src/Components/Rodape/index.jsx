import styled from "styled-components"

export default function Rodape({paramsRodape}){
    const {valor, funcaoFinalizar, ativadorBotaoFechar} = paramsRodape;
    return(
        <RodapeStyle >
            <p>Sub-Total: <span>R${String(valor.toFixed(2)).replace(".", ",")}</span></p>
            <button onClick={funcaoFinalizar} disabled={ativadorBotaoFechar}>Fechar pedido</button>
        </RodapeStyle> 
    )
}


const RodapeStyle = styled.footer`
    position: fixed;
    bottom: 0;
    height: 50px;
    background-color: #1A1FBC;
    width: 100%;
    display: flex;
    justify-content: space-between  ;
    align-items: center;
    padding: 0 30px 0 30px;
    z-index: 4;

    p{
        font-size: 30px;
        color: white;
    }

    span{
        color: #6FBC1A;
    }

    button{
        background-color: #6FBC1A;
        color: white;
        border-radius: 15px;
        border: none;
        box-shadow: 0 0 3px #000000;
        min-height: 30px;
    }
`