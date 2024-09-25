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


