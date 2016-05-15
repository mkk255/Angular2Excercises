# create backups first without branch switching. Much safer. Trust me.
./scripts/backup_branches.sh

git checkout observables
git rebase --onto jump-start head~5 head
git branch -f observables

git checkout architecture
git rebase --onto jump-start head~5 head
git branch -f architecture

git checkout forms
git rebase --onto jump-start head~7 head
git branch -f forms

git checkout routing
git rebase --onto jump-start head~5 head
git branch -f routing

git checkout jump-start