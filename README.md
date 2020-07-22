# Correr el proyecto local

> npm install
> npm start

# Documentación

Se requiere ingresar dos archivos para poder generar el mapa y el arbol filogenetico
* Un archivo .treefile con un texto de un [newick](https://es.wikipedia.org/wiki/Formato_Newick) valido
* Un archivo .json con el siguiente formato:
```json
[
    {
        "seq": "header de la sequencia del archivo fasta",
        "name": "el nombre de la ciudad, EJ: Buenos Aires, Argentina"
    },
    ...
]
```
