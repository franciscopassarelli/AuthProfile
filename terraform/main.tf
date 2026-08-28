terraform {
  required_version = ">= 1.0.0"
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23.0"
    }
  }
}

# Configuración para que Terraform se conecte a tu clúster local de Kubernetes (Docker Desktop)
provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "docker-desktop"
}

# Recurso de prueba: Un Namespace para tu aplicación gestionado por Terraform
resource "kubernetes_namespace" "auth_ns" {
  metadata {
    name = "auth-system-ns"
  }
}