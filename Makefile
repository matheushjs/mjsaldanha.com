SECRET=src/private_code.js

heroku:
	git add $(SECRET)
	git commit -m "ADD SECRETS"
	git push --force heroku master
	git reset HEAD~

clean:
	find -name "*~" -exec rm -vf '{}' \;
