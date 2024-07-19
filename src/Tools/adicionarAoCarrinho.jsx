import { useNavigate } from "react-router-dom";

export default async function adicionarAoCarrinho(id, token){
    const navigate = useNavigate()
    try{
        setBotaoInativo(true)
        const produto = {
            idProduto: id
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const resposta = await axios.put("https://store-back-0hxp.onrender.com/adicionar-carrinho", produto, config)
        alert(resposta.data)
    }catch(e){
        alert(`${e.response.data}`)
        navigate("/")
    }
    setBotaoInativo(false)
}