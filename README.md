# eng-zap-challenge-javascript

## Como rodar localmente?
Basta ter o node/npm instalado: primeiro roda o comando "npm install" e depois "npm start". Para facilitar, commitei o .env.  
Mas, para faciliar os testes, rodei o projeto na aws (com docker) e criei um swagger, segue o link: http://ec2-52-70-222-152.compute-1.amazonaws.com/swagger  
Como só é para listar os portais, escolhi o verbo get para performar e a rota foi /list/{portalOrigin}. Para rodar basta escolher o parâmetro "portalOrigin" (que pode ser "zap" ou "viva-real") e clicar em "Execute". A interface do swagger é intuitiva.

## Como rodar os testes?
Para rodar os testes: "npm run test"  
Para gerar o html com a cobertura: "npm run test:coverage"  
  
Os testes unitários e de integração ficaram com 100% de cobertura:  
![current coverage](https://i.ibb.co/dtctWRj/Screenshot-from-2019-12-09-03-40-58.png)

## Como é o fluxo do projeto?
Para abstrair um banco de dados, foi criada uma interface onde a função dela é iterar sobre os registros e decidir se tal registro será selecionado ou não (de acordo com uma determinada regra de negócio, é o que um db faz no final das contas).  
![project flow](https://i.ibb.co/cQMCLvq/Screenshot-from-2019-12-09-03-28-13.png)
