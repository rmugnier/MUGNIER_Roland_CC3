<link rel="stylesheet" href="https://gcore.jsdelivr.net/gh/Microsoft/vscode@f56f4e1adc2b5b447375d560ab817fe1ceceb104/extensions/markdown-language-features/media/markdown.css">
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode@f56f4e1adc2b5b447375d560ab817fe1ceceb104/extensions/markdown-language-features/media/markdown.css"> -->

# Dev. Web – TP5 – Tutoriel HTTP/Express Node.js

- **Nom :** MUGNIER
- **Prénom :** Roland
- **Cursus :** INFO S3 TREC 7

# Table des matières

- [Dev. Web – TP5 – Tutoriel HTTP/Express Node.js](#dev-web--tp5--tutoriel-httpexpress-nodejs)
- [Table des matières](#table-des-matières)
- [Partie 1 : serveur HTTP natif Node.js](#partie-1--serveur-http-natif-nodejs)
  - [Installation](#installation)
  - [Servir différents types de contenus](#servir-différents-types-de-contenus)
  - [Mode développement](#mode-développement)
  - [Gestion manuelle des routes](#gestion-manuelle-des-routes)
- [Partie 2 : framework Express](#partie-2--framework-express)
  - [Création du serveur](#création-du-serveur)
  - [Rendu avec EJS](#rendu-avec-ejs)
  - [Gestion d’erreurs](#gestion-derreurs)


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

**Question 1.7** quelles sont les différences entre les scripts `http-dev` et `http-prod` ?

Le package `cross-env` modifie une variable d'environnement suivant le type d'execution lancé (mode développement ou production) et le package `nodemon` en dev à la différence de `node` relance automatiquement le serveur node dès qu'il observe une modification au code.

Installation des packages `prettier` et `eslint` et ajout des fichiers de configuration disponible dans le [dépôt GIT du TP](https://github.com/gharel/devweb/tree/master/TP/TP5/base).

Le fichier de configuration de `eslint` n'est plus à jour, on le met à jour avec la commande `npx @eslint/migrate-config .eslintrc.json`.


## Gestion manuelle des routes

**Question 1.8** donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

> http://localhost:8000/index.html

HTTP/1.1 200 OK

> http://localhost:8000/random.html

HTTP/1.1 200 OK

> http://localhost:8000/  

HTTP/1.1 404 Not Found

> http://localhost:8000/dont-exist

HTTP/1.1 404 Not Found


Pour executer le même block pour deux `case` différent, il suffit de les mettre à la suite.

Pour réaliser `:nb` sur `random.html`, le module `Number` m'a bien servi.


# Partie 2 : framework Express

## Création du serveur

**Question 2.1** donner les URL des documentations de chacun des modules installés par la commande précédente.

Les liens vers leur documentation sont les suivants :
- [express](https://expressjs.com/en/4x/api.html)
- [http-errors](https://github.com/jshttp/http-errors#readme)
- [loglevel](https://github.com/pimterry/loglevel)
- [morgan](https://github.com/expressjs/morgan#readme)

**Question 2.2** vérifier que les trois routes fonctionnent.

Les 3 routes suivantes fonctionnent :
> http://localhost:8000/index.html  
> http://localhost:8000/  
> http://localhost:8000/random/33  

**Question 2.3** lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?

En executant `curl -I http://localhost:8000`, je relève les nouvelles entêtes suivantes :

```diff
+ X-Powered-By: Express
+ Accept-Ranges: bytes
+ Cache-Control: public, max-age=0
+ Last-Modified: Wed, 25 Sep 2024 03:15:29 GMT
+ ETag: W/"380-192272d3d2f"
Content-Type: text/html; charset=UTF-8
+ Content-Length: 896
Date: Mon, 30 Sep 2024 10:52:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

**Question 2.4** quand l’événement listening est-il déclenché ?

L'événement `listening` est déclenché lorsque le serveur est démarré et est prêt à recevoir des requêtes HTTP.

**Question 2.5** indiquer quelle est l’option (activée par défaut) qui redirige `/` vers `/index.html` ?

Suivant le lien de la documentation donné, il s'agit de l'option `index` :
> **index**  
> By default this module will send “index.html” > files in response to a request on a directory. > To disable this set false or to supply a new index pass a string or an array in preferred order.

**Question 2.6** visiter la page d’accueil puis rafraichir (`Ctrl+R`) et ensuite forcer le rafraichissement (`Ctrl+Shift+R`). Quels sont les codes HTTP sur le fichier `style.css` ? Justifier.

Grâce aux Dev Tools et plus particulièrement à l'onglet `Réseau`, on relève dans un premier temps un code `304` qui correspond à un `Not Modified`, le fichier est alors pas téléchargé complètement (cf. colonne taille) et dans un second temps, on flush le cache, alors on obtient un code `200` qui correspond à un `OK`, le fichier a été retéléchargé intégralement.

![Capture d'écran de l'onglet Réseau dans la console](/img/ConsoleQ2.6.png)

On active le package `morgan` avec la commande indiquée. On observe dans la console les logs des requêtes HTTP depuis l'activation du package.

## Rendu avec EJS

Je mets en place la vue EJS pour la page random.


## Gestion d’erreurs

Je mets en place l'erreur `400 Bad Request` pour la page random en cas de nombre invalide.

**Question 2.7** vérifier que l’affichage change bien entre le mode production et le mode development.

Après correction de la typo `concole`, j'observe bien une différence entre dev et prod : le stack d'exécution n'est affiché que en dev pour éviter de donner trop d'information à un utilisateur malveillant, cf les deux captures d'écran ci-dessous :

![Capture d'écran de l'erreur en mode développement](/img/ContentsDevQ2.7.png)

![Capture d'écran de l'erreur en mode production](/img/ContentsProdQ2.7.png)

Après avoir apporté les modifications nécessaires pour utiliser le package `loglevel`, je constate que les lignes `logger.debug()` ne sont pas affichés quand le niveau est défini à `WARN`, cf. captures ci-dessous :

![Capture d'écran de la console en niveau DEBUG](/img/LoggerLevelDebug.png)

![Capture d'écran de la console en niveau WARN](/img/LoggerLevelWarn.png)
