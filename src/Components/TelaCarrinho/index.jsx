import { useState, useEffect } from "react";

import MenuLateral from "../MenuLateral";
import Header from "../Header"
import { useNavigate } from "react-router-dom";

export default function TelaCarrinho(){
    const navigate = useNavigate()
    const [dadosRecebidos, setDadosRecebidos] = useState(null)
    
    useEffect(()=>{
        const validarDadosRecebidos = localStorage.getItem("store")
        console.log(validarDadosRecebidos)
        if(validarDadosRecebidos===null){
            navigate("/")
        }else{
            setDadosRecebidos(JSON.parse(validarDadosRecebidos))
        }
    }, [])

    return(
        <>
            <Header />
            <MenuLateral/>
            <p>Tela Carrinho</p>
        </>
    )
}