<link rel="stylesheet" href="https://gcore.jsdelivr.net/gh/Microsoft/vscode@f56f4e1adc2b5b447375d560ab817fe1ceceb104/extensions/markdown-language-features/media/markdown.css">
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode@f56f4e1adc2b5b447375d560ab817fe1ceceb104/extensions/markdown-language-features/media/markdown.css"> -->

# Dev. Web – TP5 – Tutoriel HTTP/Express Node.js

- **Nom :** MUGNIER
- **Prénom :** Roland
- **Cursus :** INFO S3 TREC 7

# Partie 1 : serveur HTTP natif Node.js

## Installation

**Question 1.1** donner la liste des en-têtes de la réponse HTTP du serveur.

On exécute la commande suivante :
```bash
curl -I http://localhost:8000
```

La commande retourne les en-têtes suivantes :

```http
HTTP/1.1 200 OK
Date: Wed, 25 Sep 2024 02:29:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## Servir différents types de contenus

**Question 1.2** donner la liste des en-têtes qui ont changé depuis la version précédente.

Un header qui indique le type de contenu est maintenant présent et la date a évidemment changé :

```http
[...]
Content-Type: application/json
Date: Wed, 25 Sep 2024 02:36:57 GMT
[...]
```

**Question 1.3** que contient la réponse reçue par le client ?

Aucune réponse retournée par le client, par contre une erreur apparait dans la console du serveur :
![Erreur Q1.3](img\ErreurQ1.3.png)

**Question 1.4** quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

D'après l'API de `node.js`, dans le chapitre `Errors`, l'erreur retournée est que le fichier `index.html` n'existe pas :
> ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.

Je télécharge le fichier `index.html` depuis https://github.com/gharel/devweb/tree/master/TP/TP5/base et le renomme `__index.html` pour tester l'erreur `404` en callback de promise.  

**Question 1.5** donner le code de `requestListener()` modifié avec gestion d’erreur en `async/await`

Je transforme le code en `async/await`, OK ça fonctionne. Je renomme le fichier en `index.html`, OK ça fonctionne.  
*Pour cela j'utilisse la commande `git mv` pour que mes modifications git soient propres.*

## Mode développement

Que fait les commandes :
> npm install cross-env --save
> npm install nodemon --save-dev

`npm install` installe un package JS,  
`--save`: Package will appear in your dependencies,  
`--save-dev`: Package will appear in your `devDependencies`,  
`DevDependencies` are a special category of npm packages that are only needed during the development phase of your project. Unlike regular dependencies required to run your application in production, devDependencies are used for tasks like testing, building, and local development.
  
**Question 1.6** indiquer ce que cette commande a modifié dans votre projet.

Les modules `cross-env` et `nodemon` ont été installés dans le répertoire. Le 1er en dépendance normale et le 2ème en dépendances "dev".  
J'ai ajouté le répertoire des modules en `.gitignore`
