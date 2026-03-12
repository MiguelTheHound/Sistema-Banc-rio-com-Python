const API_URL = "http://127.0.0.1:5000";

function mostrar(msg) {
  document.getElementById("saida").textContent = msg;
}

async function depositar() {
  let valor = Number(document.getElementById("deposito").value);
  let resposta = await fetch(`${API_URL}/depositar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ valor: valor }),
  });
  let dados = await resposta.json();
  mostrar(dados.mensagem);
}

async function sacar() {
  let valor = Number(document.getElementById("saque").value);
  let resposta = await fetch(`${API_URL}/sacar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ valor: valor }),
  });
  let dados = await resposta.json();
  mostrar(dados.mensagem);
}

async function mostrarExtrato() {
  let resposta = await fetch(`${API_URL}/extrato`);
  let dados = await resposta.json();
  mostrar(`Extrato:\n${dados.extrato}\nSaldo: ${dados.saldo}`);
}

async function criarUsuario() {
  const usuario = {
    nome: document.getElementById("nome").value,
    id: document.getElementById("id").value,
    nascimento: document.getElementById("nascimento").value,
    endereco: document.getElementById("endereco").value,
  };

  let resposta = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  let dados = await resposta.json();
  mostrar(dados.mensagem);
}
// Função para mostrar o formulário de criação de usuário
function mostrarCriarUsuario() {
  const area = document.getElementById("area-usuario");

  // Se estiver escondido, mostra. Se clicar de novo, esconde (toggle).
  if (area.style.display === "none") {
    area.style.display = "block";
  } else {
    area.style.display = "none";
  }
}

// Opcional: Esconder a área novamente após criar o usuário com sucesso
async function criarUsuario() {
  const usuario = {
    nome: document.getElementById("nome").value,
    id: document.getElementById("id").value,
    // ... outros campos ...
  };

  let resposta = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  let dados = await resposta.json();
  mostrar(dados.mensagem);

  // Esconde o formulário após a criação
  document.getElementById("area-usuario").style.display = "none";
}

async function listarContas() {
  let resposta = await fetch(`${API_URL}/contas`);
  let contas = await resposta.json();
  let texto = "";
  contas.forEach((c) => {
    texto += `Conta: ${c.numero} | Titular: ${c.titular}\n`;
  });
  mostrar(texto || "Nenhuma conta cadastrada.");
}
