import styled from "styled-components";

const MainStyle = styled.main`

    .container-produto{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: green;
        width: 175px;
        height: 225px;
        border-radius: 5px;
        margin: 5px;
        padding: 10px 10px 30px 10px;
        position: relative;
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

export default MainStyle