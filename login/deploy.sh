set -e

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:<USERNAME>/<REPO-NAME>.git master:gh-pages

cd -