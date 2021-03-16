# Welcome to StackEdit!
#####  Delivery Much Tech Challenge: https://github.com/delivery-much/backend-challenge

O desafio foi realizado utilizando node.js, com typescript,  express como framework web, jest para os testes  e para o banco o mongodb.

Foi estrutarado pensando na utilização da Clean Architecture e princípios do SOLID, utilizando TDD como metodologia de desenvolvimento.

## Executando a aplicação
A aplicação, por padrão, roda na porta :3000 e para iniciar o sistema é necessário:

	docker-compose up
    npm start

No compose encontram-se os serviços rabbitmq, stock-service e mongodb. Caso seja necessário rodar apenas o mongodb utilize
	

    docker-compose up mongodb

Para alterar a porta de execução basta ir em:

    .src/config/main/env.ts
E alterar **server.port** para a porta desejada.

## Executando os testes

Foram configurados os seguintes scripts:

    npm run test #testes unitários/integração
    npm run test:verbose #testes unitários/integração + log habilitado
    npm run test:unit #test unitários
    npm run test:integration #testes de integração
    npm run test:ci #testes unitários/integração + coverage
   O coverage report é gerado em:
   

  

    ./coverage

