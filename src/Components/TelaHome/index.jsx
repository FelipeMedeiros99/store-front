import { useState } from "react";

import MainStyle from "../../StyleComponents/MainStyle";


export default function TelaHome() {
    // states 

    // vars
    const dadosRecebidos = JSON.parse(localStorage.store);
    const { produtos, token } = dadosRecebidos;

    return (
        <MainStyle >
            <p>Tela Home</p>
            {produtos.map((produto) => {
                const { nome, imagem, id, descricao, especificacoes, preco } = produto
                console.log(produto)
                return (

                    <div className="container-produto">
                        <div className="container-imagem">
                            <img src={imagem} alt={descricao} className=""/>
                        </div>
                        <h2>R${String(preco.toFixed(2)).replace(".", ",")}</h2>
                        <p>{descricao.slice(0, 73)}...</p>
                        <button>Add</button>
                    </div>
                )
            })}
            
        </MainStyle>
    )
}