clean:
	find -name "*~" -exec rm -vf '{}' \;

dox:
	yuidoc .
