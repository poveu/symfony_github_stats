# Symfony 4 (and ReactJS) GitHub Stats

Simple **Symfony 4** and **ReactJS** app that lets you check some main stats of a GitHub repository and compare it with another repository.

### Usage

You can use the main view created with **ReactJS**, or get JSON data from this app API with these endpoints:

- **/repo/_{owner}_/_{name}_** - displays stats of single repository <sub>(_for example: /repo/poveu/IPS_)</sub>
- **/repo/_{owner}_/_{name}_/compare/_{owner}_/_{name}_** - displays stats and comparision of two repositories <sub>(_for example: /repo/poveu/IPS/compare/poveu/symfony_github_stats_)</sub>

### Requirements:
- composer
- yarn

### If you're cloning/forking, make sure to:
- create **.env.local** file in the root directory with GitHub app credentials (needed to connect to GitHub API):
```
GH_USER_AGENT=your_github_username
GH_CLIENT_ID=your_github_app_client_id
GH_CLIENT_SECRET=your_github_client_secret
```
- install composer + yarn packages by running in root directory:
```
composer install
yarn install
```
- generate public assets by running in root directory:
```
yarn encore dev
```

### Live demo available [here](https://paveart.pl/github/symfony_github_stats/public/)
