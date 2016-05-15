resetBranches () {
    git fetch --tags origin
    git branch -f observables origin/observables
    git branch -f architecture origin/architecture
    git branch -f forms origin/forms
    git branch -f routing origin/routing
    git branch -f redux origin/redux
    git branch -f ngrx origin/ngrx
}

echo -n "You are about to *reset* all local branches with latest version from Github. Proceed? (y/n)? "
read answer
if echo "$answer" | grep -iq "^y" ;then
    resetBranches
else
    echo "kthxbye"
fi





