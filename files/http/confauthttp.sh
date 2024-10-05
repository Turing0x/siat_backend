#!/bin/bash
# -*- ENCODING: UTF-8 -*-
#Estructura de directorios para sitio web
mkdir -p /var/www/html/public/novedades.robot.zone.cu #
mkdir -p /var/www/html/public/ciencia.robot.zone.cu #
chmod -R 755 /var/www/html #
#Copiar ficheros de configuracion
cp -f en_etc.apache2.sites-available/* /etc/apache2/sites-available/ #
#Copiar pagina de prueba para directorios creados
cp -f -r en_var.www.html/* /var/www/html/ #
a2dissite default #
a2ensite novedades.robot.zone.cu #
a2ensite ciencia.robot.zone.cu #
service apache2 restart #
exit #
