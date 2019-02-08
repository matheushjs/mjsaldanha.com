clean:
	find -name "*~" -exec rm -vf '{}' \;

docs:
	yuidoc .
