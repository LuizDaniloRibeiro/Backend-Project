# Backend com JWT (MongoDB e NodeJS)
Aplicativo mobile feito para que um professor realize um login e consiga cadastrar um curso para sua plataforma

- Sistema de login
- CRUD Curso (Com upload de imagem)


### 3. Pacotes necessários

Serão necessários os seguintes pacotes, que poderão ser instalados via npm.
```
 npm i express express-validator bcryptjs jsonwebtoken mongoose@5.11.15 dotenv multer
 npm i -g nodemon
```

1. **express**
Express é um framework para `nodejs`. Ele é minimalista, flexível e contém um robusto conjunto de recursos para desenvolver aplicações web, como um sistema de Views intuitivo (MVC), um robusto sistema de roteamento, um executável para geração de aplicações e muito mais.


2. **express-validator**
Para validar o corpo dos dados no servidor, dentro do framework express, será utilizado esta biblioteca.
Ela permite uma validação no lado do servidor. Dessa forma, se o usuário desabilitar a validação no lado cliente, faremos essa validação no lado servidor e exibiremos um erro.

3. **bcryptjs**
Esta biblioteca será utilizada para efetuarmos o hash da senha e assim podermos armazená-la no MongoDB. Dessa maneira, mesmo os usuários administradores não terão acesso a conta do usuário.

4. **jsonwebtoken**
** jsonwebtoken ** será usado para criptografar nossa senha e retornar um token. 
Poderemos usar esse ** token ** para nos autenticar nas páginas seguras da nossa aplicação.  

5. **mongoose**
Mongoose é o nosso framework para integrar com o MongoDB.
Por questões de compatibilidade, utilizaremos a versão 5.11.15, instalando da seguinte forma:
```
npm i mongoose@5.11.15
```

6. **nodemon**
O nodemon é uma daquelas ferramentas de grande utilidade para quem trabalha com `nodejs`
Basicamente ele é um _file watcher_ que roda internamente o próprio comando **node**. A diferença entre usá-lo ou usar o comando **node** é que ele faz auto-restart da aplicação, toda vez que um arquivo do projeto for modificado.

7. **dotenv**
O **dotenv** permite a criação de variáveis de ambiente. 
Ele é um módulo de dependência que carrega variáveis de ambiente de um arquivo .env para process.env.
As variáveis de ambiente ajudam a definir valores que não queremos codificar diretamente em nosso código fonte.

8. **multer**
O **multer**  é um middleware para express.js que facilita receber arquivos binários nas requisições.
----

## Licença
[MIT](https://choosealicense.com/licenses/mit/)

## Autor
Luiz Danilo Ribeiro