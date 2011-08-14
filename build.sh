#!/bin/sh

# first get the current version from gadget.xml
echo -n "reading version from gadget.xml: "
version=$(grep "<version>" gadget.xml | sed 's/[^0-9.]//g; s/[.]/_/g' )
echo $version

echo "zipping data to new Gadget:"
zip -r -9 builds/Helpdesk$version.Gadget * -x */.gitignore builds/ build.sh builds/*

echo "finish."
