#!/bin/sh

mprotc go -out golang/ catalog.mprot
mprotc js --typedecls -out js/ catalog.mprot
