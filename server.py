from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Permite que o frontend acesse o backend

# Banco de dados temporário em memória
dados_bancarios = {
    "saldo": 0,
    "extrato": "",
    "usuarios": [],
    "contas": []
}

@app.route("/depositar", methods=["POST"])
def depositar():
    data = request.json
    valor = data.get("valor", 0)
    if valor > 0:
        dados_bancarios["saldo"] += valor
        dados_bancarios["extrato"] += f"Depósito: {valor}\n"
        return jsonify({"mensagem": "Depósito realizado", "saldo": dados_bancarios["saldo"]})
    return jsonify({"mensagem": "Valor inválido"})

@app.route("/sacar", methods=["POST"])
def sacar():
    data = request.json
    valor = data.get("valor", 0)
    if valor > dados_bancarios["saldo"]:
        return jsonify({"mensagem": "Saldo insuficiente"})
    
    dados_bancarios["saldo"] -= valor
    dados_bancarios["extrato"] += f"Saque: {valor}\n"
    return jsonify({"mensagem": "Saque realizado", "saldo": dados_bancarios["saldo"]})

@app.route("/extrato")
def ver_extrato():
    return jsonify({
        "saldo": dados_bancarios["saldo"],
        "extrato": dados_bancarios["extrato"]
    })

@app.route("/usuarios", methods=["POST"])
def criar_usuario():
    novo_usuario = request.json
    dados_bancarios["usuarios"].append(novo_usuario)
    return jsonify({"mensagem": f"Usuário {novo_usuario['nome']} criado!"})

@app.route("/contas", methods=["POST", "GET"])
def gerenciar_contas():
    if request.method == "POST":
        id_usuario = request.json.get("id")
        usuario = next((u for u in dados_bancarios["usuarios"] if u["id"] == id_usuario), None)
        if usuario:
            nova_conta = {"numero": len(dados_bancarios["contas"]) + 1, "titular": usuario["nome"]}
            dados_bancarios["contas"].append(nova_conta)
            return jsonify({"mensagem": "Conta criada com sucesso!"})
        return jsonify({"mensagem": "Usuário não encontrado"})
    return jsonify(dados_bancarios["contas"])

if __name__ == "__main__":
    app.run(debug=True)