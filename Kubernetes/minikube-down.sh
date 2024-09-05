#!/bin/bash

minikube kubectl -- delete -f secrets.yaml 

minikube kubectl -- delete -f configmap.yaml

minikube kubectl -- delete -f deployment.yaml 

minikube kubectl -- delete -f service.yaml  

minikube kubectl -- delete -f ingress.yaml

minikube kubectl -- delete -f pvc.yaml

minikube kubectl -- delete -f pv.yaml 
