let carrinho = [];
let taxaEntrega = 5;
let numeroPedido = Math.floor(Math.random() * 10000);

function verificarStatus(){
  let hora = new Date().getHours();
  let status = document.getElementById("status");

  if(hora >= 18 && hora <= 23){
    status.innerText = "🟢 Aberto agora";
    status.style.color = "lightgreen";
  }else{
    status.innerText = "🔴 Fechado (abre às 18h)";
    status.style.color = "red";
  }
}

verificarStatus();

function addCarrinho(nome, preco){
  let item = carrinho.find(p => p.nome === nome);
  if(item){
    item.qtd++;
  }else{
    carrinho.push({nome, preco, qtd:1});
  }
  atualizar();
}

function atualizar(){
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item,index)=>{
    total += item.preco * item.qtd;

    lista.innerHTML += `
      <div>
        ${item.nome} - R$ ${item.preco} x ${item.qtd}
        <button onclick="diminuir(${index})">-</button>
        <button onclick="aumentar(${index})">+</button>
        <button onclick="remover(${index})">Remover</button>
      </div>
    `;
  });

  total += taxaEntrega;

  document.getElementById("total").innerText = total.toFixed(2);
}

function aumentar(index){
  carrinho[index].qtd++;
  atualizar();
}

function diminuir(index){
  if(carrinho[index].qtd > 1){
    carrinho[index].qtd--;
  }
  atualizar();
}

function remover(index){
  carrinho.splice(index,1);
  atualizar();
}

function finalizarPedido(){
  let endereco = document.getElementById("endereco").value;
  let pagamento = document.getElementById("pagamento").value;

  if(carrinho.length === 0){
    alert("Carrinho vazio!");
    return;
  }

  if(endereco === "" || pagamento === ""){
    alert("Preencha endereço e pagamento!");
    return;
  }

  let mensagem = `Pedido Nº ${numeroPedido}%0A`;

  carrinho.forEach(item=>{
    mensagem += `${item.nome} x${item.qtd}%0A`;
  });

  mensagem += `%0ATaxa: R$ ${taxaEntrega}`;
  mensagem += `%0ATotal: R$ ${document.getElementById("total").innerText}`;
  mensagem += `%0AEndereço: ${endereco}`;
  mensagem += `%0APagamento: ${pagamento}`;

  window.open(`https://wa.me/5585984273819?text=${mensagem}`);
}