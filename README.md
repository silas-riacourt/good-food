[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://ecole-alternance.cesi.fr/wp-content/themes/cesi/static/logo/ecole-alternance.svg">

  <h3 align="center">GOOD DEV</h3>

  <p align="center">
    CESI MAALSI 2021 - Cube 1 - GOOD DEV
    <br />
    <a href="https://github.com/Silasssss/good-food/wiki"><strong>Voir la documentation »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/Silasssss/good-food/issues">Remonter un problème</a>
    ·
    <a href="https://github.com/Silasssss/good-food/issues">Demande de fonctionnalités</a>
  </p>
</p>



<details>
  <summary>A propos du projet</summary>

[![Product Name Screen Shot][product-screenshot]]()

Le projet consiste à fournir une architecture applicative au goût du jour, permettant de répondre à l’ensemble de ses besoins et contraintes. Cela contient aussi bien la refonte de l’application de commande que la refonte de l’infrastructure d’hébergement.

  
  <strong>Contexte :</strong> 
  
L’enseigne Good Food qui est composée de 150 restaurants franchisés sur la France, la Belgique et le Luxembourg propose des prestations de restauration conventionnelle, de la vente à emporter et de la livraison. Aujourd’hui le système d'information atteint ses limites notamment au niveau des performances très médiocres et des choix applicatifs qui empêchent toute évolution. De plus, il n'existe pas de solution mobile.

  <strong>Périmètre du projet :</strong>
  
La périmètre du projet est le suivant: développer une application de commande mobile et web ainsi qu’une application pour les franchisés afin qu’ils puissent gérer leurs commandes, leurs préparations, leurs fournisseurs et leurs livraisons. Il va aussi être nécessaire de refondre l’infrastructure d’hébergement.
 
  <strong>Contraintes :</strong>
  
* La totalité des data doit être conservée et récupérée dans la nouvelle base
* La migration de l’ancienne base de données vers la nouvelle devra se faire sans aucun impact sur la production
* Le code devra être documenté
* Cette évolution de l’application sera concomitante avec l’adoption d’un nouveau système de caisse dont le déploiement est assuré par le fournisseur de caisse lui-même
* Il conviendra de développer une API RESTful pour permettre la connexion sur l’application depuis d’autres solutions (comptabilité, applications spécifiques à la logistique ou toute autre application sortant du périmètre)
* Une application conforme au cahier des charges fonctionnel.
* Le service marketing de Good Food a convenu d’une date de lancement de l’application mobile et de la nouvelle version du site sans consulter le service technique et encore moins le prestataire chargé du développement

  
  

  
### Développé avec

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* IONIC
* Vue JS
* Java Spring Boot
* PostgreSQL
</details>

<details>
   <summary>Démarrage</summary>


### Pré-requis

 - Java
 - node
 - npm
 - Maven


### Installation

1. Cloner le repo

```
$ git clone git@github.com:Silasssss/good-food.git
```
2. Installation les paquets de notre API

```
$ cd api
$ ./mvnw
```

3. Installer les paquets nécessaire à IONIC

```
$ cd frontend
$ npm i
```
</details>
 <details>
 <summary>Usage</summary>

1. Démarrer le backend

```
$ cd backend
$ ./mvnw
```

2. Démarrer le frontend
```
$ cd frontend
$ npm run dev
```
</details>
<details>
  <summary>Roadmap</summary>


Consultez les [problèmes ouverts](https://github.com/Silasssss/good-food/issues) et les fonctionnalités proposées.
  
</details>

<details>
  <summary>License</summary>


Distributé sous licence MIT. Voir `LICENSE` pour plus d'informations.

</details>
<details>
  <summary>Contact</summary>

Boissel Nicolas - ncboissel@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/Silasssss/good-food/]
(https://github.com/Silasssss/good-food/)


</details>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[contributors-shield]: https://img.shields.io/github/contributors/Silasssss/good-food.svg?style=for-the-badge
[contributors-url]: https://github.com/Silasssss/good-food/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Silasssss/good-food.svg?style=for-the-badge
[forks-url]: https://github.com/Silasssss/good-food/network/members
[stars-shield]: https://img.shields.io/github/stars/Silasssss/good-food.svg?style=for-the-badge
[stars-url]: https://github.com/Silasssss/good-food/stargazers
[issues-shield]: https://img.shields.io/github/issues/Silasssss/good-food.svg?style=for-the-badge
[issues-url]: https://github.com/Silasssss/good-food/issues
[license-shield]: https://img.shields.io/github/license/Silasssss/good-food.svg?style=for-the-badge
[license-url]: https://github.com/Silasssss/good-food/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/nicolas-boissel-410067129/
[product-screenshot]: https://www.bypeople.com/wp-content/uploads/2019/01/travel-mobile-app-template.png

