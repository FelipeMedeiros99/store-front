import styled from "styled-components";

const LoginCadastroStyle = styled.form`
    background-color: #1A1FBC;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .icone-carrinho{
        width: 30px;
    }

    h1{
        width: 100%;
        max-width: 155px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 35px;
        color: white;
        font-weight: 700;
        margin-bottom: 30px;
    }

    input{
        width: 100%;
        max-width: 230px;
        height: 35px;
        border-radius: 30px;
        border: none;
        padding: 10px;
        margin-bottom: 10px;
    }

    input::placeholder{
        color: black;
        font-weight: 400px;
    }

    button{
        margin: 30px 0;
        background-color: #6FBC1A;
        border: none;
        box-shadow: 0 0 3px #0000007b;
        color: white;
        border-radius: 30px;
        width: 100px;
        height: 35px;
    }

    button:disabled{
        background-color: #8eb961;
    }

    a{  

        color: white;
        font-style: italic;
    }

    p{
        color: #BC661A;
    }
`

export default LoginCadastroStyle