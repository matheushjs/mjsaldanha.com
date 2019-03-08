clean:
	find -name "*~" -exec rm -vf '{}' \;
	find -name "*.swp" -exec rm -vf '{}' \;

dox:
	yuidoc .
