clean:
	find -name "*~" -exec rm -vf '{}' \;

dox:
	yuidoc . -t ./yuidoc-theme
