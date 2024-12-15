🎳 Bowling Game Backend
🏆 API de Calcul de Score
Service backend robuste pour le calcul précis et complexe des scores de bowling.

✨ Fonctionnalités Principales
🌀 Gestion des Strikes : Support des règles avancées pour les strikes (15 quilles).
➕ Calcul des Bonus Cumulatifs : Ajout automatique des points bonus pour les strikes et spares.
📜 Validation des Règles Officielles : Conforme aux standards du bowling.
🌟 Détection des Parties Parfaites : Reconnaissance automatique des scores de 300 points.
💾 Persistance des Scores : Sauvegarde et gestion des historiques.
🚀 Technologies Utilisées
Node.js
Express
MongoDB
TypeScript
Jest
📦 Installation
Cloner le dépôt :

git clone https://github.com/yourusername/bowling-game-backend.git  
cd bowling-game-backend  
Installer les dépendances :

npm install  
Configurer l'environnement :

Copier l'exemple de fichier d'environnement :


cp .env.example .env  
Modifier le fichier .env avec vos propres paramètres MongoDB.
Démarrer le serveur en mode développement :


npm run dev  
📚 Points d'API
1. Calcul de Score
Endpoint : POST /api/scores/calcul
Exemple de Payload :


{
  "playerName": "John Doe",
  "frames": [[10 , 4 , 1 ], [7, 3, 2], [9, 0 , 1], [10 ,0, 5], , [10, 10, 10]]
}

2. Historique des Scores
Endpoint : GET /api/scores/historique
🎯 Logique de Scoring
Validation des Lancers : Vérifie les entrées pour chaque frame.
Calcul des Bonus : Gère les bonus pour strikes et spares.
Gestion de la Dernière Frame : Support des règles spécifiques à la 10e frame.
Détection des Parties Parfaites : Identifie les scores parfaits (300 points).
Score Cumulatif en Temps Réel : Mise à jour dynamique après chaque lancer.

🗃️ Modèle de Données


interface Game {
  playerName: string;
  frames: Frame[];
  totalScore: number;
  date: Date;
}

interface Frame {
  throws: number[];
  frameScore: number;
  isStrike: boolean;
  isSpare: boolean;
}
🔄 Scripts Disponibles

Démarrage en mode développement :

npm run dev  
Tests :

npm run test  
Build :

npm run build  
Démarrage en production :

npm start  
🧪 Tests
Tests unitaires pour la logique de calcul des scores.
Tests d'intégration pour les endpoints API.
Scénarios pour valider les règles officielles, y compris les parties parfaites.
📊 Performance
Mise en cache MongoDB pour des réponses rapides.
Optimisation des algorithmes de calcul.
Gestion asynchrone des validations et des erreurs.
🔐 Sécurité
Validation des Entrées : Contrôle strict des données reçues par l'API.
Sanitization : Nettoyage des données pour prévenir les vulnérabilités.
Rate Limiting : Protection contre les abus d'API.
Gestion des Erreurs : Messages d'erreur clairs et sécurisés.
📝 Documentation API
La documentation Swagger est disponible à l’adresse suivante : /api-docs.
🛠️ Outils de Développement
ESLint : Pour le linting du code.
Prettier : Pour le formatage automatique.
Nodemon : Pour le rechargement à chaud en développement.
TypeScript : Typage statique pour un code robuste.
Jest : Framework de tests.
📈 Monitoring
Logs Structurés : Suivi des requêtes et des erreurs.
Métriques de Performance : Surveillance en temps réel.
Alertes : Notifications en cas d’incidents.
📝 Licence
Ce projet est sous licence MIT.

