#!/bin/bash

build_backend_image() {
    
    ################################################
    # Gerando a imagem docker do backend
    ################################################
    
    # eval ${minikube docker-env}

    docker build -f ../DockerFile.backend -t musky-huskle_backend ../

    minikube image load musky-huskle_backend
}

build_frontend_image() {
    
    ################################################
    # Gerando a imagem docker do frontend
    ################################################

    # eval ${minikube docker-env}
    
    docker build -f ../DockerFile.frontend -t musky-huskle_frontend ../
    
    minikube image load musky-huskle_frontend
}

load_mysql_image() {
    minikube image load mysql:5.7
}

load_envoy_image(){
    minikube image load envoyproxy/envoy:v1.30-latest
}

################################################
# Inicializando o Minikube
################################################

echo "STARTANDO MINIKUBE"

minikube config set cpus 4

minikube config set memory 8192

minikube start 

################################################
# Habilitando o Ingress
################################################

minikube image load k8s.gcr.io/ingress-nginx/controller:v1.9.4

minikube addons enable ingress

################################################
# Inicializando o DashBoard
################################################

minikube addons enable dashboard

minikube addons enable metrics-server

################################################
# Verificando flag -b
################################################

while getopts ":b" option; do
   case $option in
      b) # build images
        echo "BUILDING IMAGES"
         build_backend_image
         build_frontend_image
         load_mysql_image
         load_envoy_image
   esac
done

################################################
# Configurando o muskyhuskle
################################################

cd db

minikube kubectl -- apply -f secrets.yaml 

minikube kubectl -- create -f pv.yaml 

minikube kubectl -- create -f pvc.yaml

minikube kubectl -- apply -f configmap.yaml

minikube kubectl -- apply -f deployment.yaml 

minikube kubectl -- apply -f service.yaml  

cd ../backend

minikube kubectl -- apply -f deployment.yaml 

minikube kubectl -- apply -f service.yaml  

cd ../frontend

minikube kubectl -- apply -f deployment.yaml 

minikube kubectl -- apply -f service.yaml  

cd ..

################################################
# Configurando o Ingress
################################################

minikube kubectl -- apply -f ingress.yaml

minikube dashboard &
