# install serverless-framework

npm i -g serverless@3.16.0

# sls ou serverless para iniciar o template
# configurar serverless dashboard
# TEMPLATE HTTP_API
sls

# para subir o projeto e atualizar as alterações
sls deploy

# traz as informações sobre as funções serverless
sls info

#invoke function locally

sls invoke local -f api

#invoke function remote

sls invoke -f api

# remove todos os recursos do projeto

sls remove


