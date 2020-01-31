# Stream em node

# Processamento producer + consumer - stream
## Como rodar localmente?
Para rodar o server (basta ter o node/npm instalado, dependendo do SO pode ser preciso rodar com sudo):  
```bash
npm run server
```  
Para rodar o client:  
```bash
npm run client
```  
Os arquivos criados vão para tcp/output  
...  
...  
...  
# Processamento producer + consumer - sem stream
## Como rodar localmente?
Sem docker (basta ter o node/npm instalado, dependendo do SO pode ser preciso rodar com sudo):  
```bash
npm install && npm start
```   
Com docker:  
```bash
docker build -t stream . && docker run -p 80:80 -d stream  
```  
Para efeitos de testes, commitei o .env.  

Rodei o projeto no EC2 (com docker) e criei um swagger, segue o link:  
http://ec2-52-70-222-152.compute-1.amazonaws.com/swagger  
Também paralelizei o app usando o módulo nativo de cluster e orquestrei com Kubernetes. Segue link do endpoint do k8s:  
http://ab364e0091b0c11ea83fe02464d82327-190797379.us-west-2.elb.amazonaws.com/swagger  
Segue link da imagem, para mostrar que de fato o endpoint é do k8s: https://i.imgur.com/CwvohoF.png  

Como só é para listar os portais, escolhi o verbo get para performar e a rota definida foi /list/{portalOrigin}. Para rodar basta escolher o parâmetro "portalOrigin" (que pode ser "zap" ou "viva-real") e clicar em "Execute". A interface do swagger é intuitiva.

## Como rodar os testes?
Para rodar os testes: "npm run test"  
Para gerar o html com a cobertura: "npm run test:coverage"  
  
Os testes unitários e de integração ficaram com 100% de cobertura:  
![current coverage](https://i.ibb.co/dtctWRj/Screenshot-from-2019-12-09-03-40-58.png)

## Como é o fluxo do projeto com stream?
É carregado um arquivo com alguns gigas, e feito um stream para o server. A medida que o server vai processando vai parseando os dados.  

## Como é o fluxo do projeto sem stream?
Para abstrair um banco de dados, foi criada uma interface onde a função dela é iterar sobre os registros e decidir se tal registro será selecionado ou não (de acordo com uma determinada regra de negócio, é o que um db faz no final das contas).  
Com essa abordagem alguns ganhos foram naturais (aplicar a Opção B foi imediato, por exemplo), como legibilidade e a complexidade ficando em O(n). Se a regra de negócio ficasse 100% acoplada a interface, a complexidade real não ficaria em O(n) (apesar da complexidade amortizada ficar).  
![project flow](https://i.ibb.co/cQMCLvq/Screenshot-from-2019-12-09-03-28-13.png)
