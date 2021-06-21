## Arquitetura utilizada no Back-end

No back-end, primeiramente, houve a separação entre aplicação e configuração. Por causa disso, caso seja necessário criar outra configuração com outro banco de dados, novos métodos de acesso ou uma configuração diferente, não seria necessário grandes alterações na aplicação. 

Na aplicação, criou-se uma camada de rotas, que seria responsável por fazer o roteamento da aplicação. Com isso, cada rota gera uma subcamada dentro da camada de rotas. Portanto, navegar entre os códigos responsáveis por cada resposta no navegador e, também, saber os devidos pontos de entrada é algo muito simples e intuitivo. Cada rota, tem um controller que fica responsável por lidar com a requisição, acessar os modelos e enviar uma resposta coerente para o front-end.

Além disso, também há a presença de testes que realizam testes principalmente nos acessos ao banco de dados e no repositório responsável por abstrair o acesso dos modelos à ao banco de dados.