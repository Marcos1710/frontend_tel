# Frontend
## Projeto finalizado! 🚀

### Features

- [x] Listagem dos planos telefonicos
- [x] Consulta de valores de tarifas

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Backend](https://github.com/Marcos1710/backend_tel)

- Na pasta do frontend vá no arquivo: src/utils/api.js
- nesse arquivo encontra-se o endereço do servidor backend para realizar a comunicação,
- nesse arquivo informe o ip da sua máquina na porta "3333" examplo: "http://127.0.0.1:3333/v1/".

```bash
# Endpoint disponível
http://127.0.0.1:3333/v1/operations?page=page&offset=offset - Lista todos os planos e valores 
http://127.0.0.1:3333/v1/operation/check?source=source&destination=destination&timer_minutes=timer_minutes&plain=plain - Consulta valores de ligações com o plano
```

### 🎲 Rodando o Front End

```bash
# Vá para a pasta do projeto
# Instale as dependências
$ npm i

# Execute a aplicação em modo de desenvolvimento
$ npm start
```
### 🛠 Tecnologias utilizadas

As seguintes tecnologias foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [Axios](https://github.com/axios/axios)
- [Material-UI](https://mui.com/pt/)

### Autor

---

# Marcos Santos

[GitHub](https://github.com/Marcos1710)
[linkedin](https://www.linkedin.com/public-profile/in/marcos-samuel-1710)