# 🚀 DevOps Platform Lab - DevOps Pipeline & Infrastructure Project

Proyecto integral de DevOps implementado para una aplicación frontend, abarcando contenedorización, orquestación, infraestructura como código (IaC), automatización de CI/CD y observabilidad con monitoreo.

---

## 🛠️ Tecnologías y Herramientas Utilizadas
- **Frontend:** Node.js / React (o arquitectura estática empaquetada).
- **Contenedorización:** Docker & Docker Hub.
- **Orquestación:** Kubernetes (K8s local mediante Docker Desktop).
- **Infraestructura como Código (IaC):** Terraform.
- **CI/CD:** GitHub Actions.
- **Monitoreo & Observabilidad:** Prometheus & Grafana (vía Helm Charts).

---

## 📂 Estructura del Proyecto
```text
AuthProfile/
├── .github/workflows/ci-cd.yml   # Pipeline de automatización en GitHub Actions
├── k8s/                          # Manifiestos y configuraciones de Kubernetes
├── terraform/                    # Configuración de Infraestructura como Código (IaC)
├── public/ & src/                # Código fuente de la aplicación frontend
├── Dockerfile                    # Instrucciones para empaquetar la app en contenedor
└── README.md                     # Documentación del proyecto


⚙️ Componentes de la Arquitectura
1. Contenedorización (Docker)
La aplicación frontend está empaquetada en una imagen optimizada utilizando un Dockerfile multi-etapa o estándar, la cual se compila y se sube de manera automática a Docker Hub a través del pipeline.

2. Automatización (CI/CD con GitHub Actions)
El pipeline configurado en .github/workflows/ci-cd.yml se dispara automáticamente ante cada push a la rama main. Sus etapas principales son:

Instalación de dependencias y build de la aplicación.

Autenticación y envío automático de la imagen a Docker Hub.

Inicialización y validación de sintaxis de la infraestructura con Terraform.

3. Infraestructura como Código (Terraform)
La provisión y control del entorno de infraestructura local se gestiona mediante scripts declarativos ubicados en la carpeta /terraform, garantizando despliegues repetibles y control de estados (terraform.tfstate).

4. Orquestación (Kubernetes)
La aplicación se despliega de forma local en un clúster de Kubernetes (Docker Desktop), gestionando los recursos mediante objetos estándar (Deployments, Services) asegurando alta disponibilidad y escalabilidad del contenedor.

5. Monitoreo y Observabilidad (Prometheus & Grafana)
Se implementó un stack completo de monitoreo corporativo utilizando el chart de Helm kube-prometheus-stack:

Prometheus: Recolecta métricas en tiempo real del clúster y de los recursos de los pods.

Grafana: Interfaz visual accesible mediante port-forwarding (localhost:3000) para auditar el rendimiento, uso de memoria/CPU y el estado general de la infraestructura.

🔧 Guía de Ejecución Local (Paso a Paso)
Clonar el repositorio
Bash
git clone [https://github.com/franciscopassarelli/AuthProfile.git](https://github.com/franciscopassarelli/AuthProfile.git)
cd AuthProfile
1. Levantar la aplicación con Docker
Bash
docker build -t auth-profile:latest .
docker run -p 8080:80 auth-profile:latest
2. Inicializar Terraform
Bash
cd terraform
terraform init
terraform validate
cd ..
3. Verificar los Pods en Kubernetes
Bash
kubectl get pods
4. Acceder al Monitoreo (Grafana)
Para levantar el panel de métricas y visualizar los dashboards del clúster:

Bash
kubectl port-forward svc/monitoring-grafana 3000:80
Abrir en el navegador: http://localhost:3000

Credenciales por defecto (Usuario: admin).
