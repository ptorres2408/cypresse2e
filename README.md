# cypress_e2e

Aplicación construida en reactjs que ejecuta peticiones a un servidor rest gratuito, para realizar los test funcionales del proceso de logín aplicando **fixtures**, **POM** e **interceptors**, con la intención de hacer prácticas sobre las actions de github sobre dichos test y la integración de cambios en el repositorio.

## Servicio consumido

https://reqres.in/

## Run application

1. git clone https://github.com/pedRoot/cypresse2e.git
2. git fetch
3. git pull
4. git checkout develop
5. npm install
6. npm run start

## Run testcases

1. npm run start (la app debe estar corriendo)
2. Vía panel:
   1. npm run cy:o
   2. Dar click sobre test
   3. Seleccionar el testcase que desee ejecutar.
3. Vía CLI:
   1. npm run cy:r

## Descripción del action definido.

El action ==Cypress Test== se activa tras cualquier commit envíado a la rama develop, este action corre en la máquina virtual de ubuntu-latest, la cual no tiene instalado yarn, por eso el uso de npm sobre yarn, al correr con éxito los test definidos en la carpeta ==cypress/test== se aprueba el commit en caso contrario no es aprobado.

### Definición del action

.github/workflows/main.yml 

```yml
name: Cypress Test

on:
  push:
    branches:
      - "develop"

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.4.0
      - name: Cypress.io
        uses: cypress-io/github-action@v2.9.7
        with:
          start: npm run start
```


