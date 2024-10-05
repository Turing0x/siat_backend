#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i en_etc.samba/* /etc/samba/ #
useradd -m ingeniero #
useradd -m tecnico #
groupadd trabajadores #
useradd -g trabajadores ingeniero
useradd -g trabajadores tecnico
passwd root #
passwd -a docencia #
smbpasswd -a tecnico #
#Evitar que los usuarios inicien sesion remota por ssh
cp en_etc.ssh/* /etc/ssh/sshd_config #
mkdir -p /home/documentos/publicaciones #
ls -l /home/documentos/publicaciones #
mkdir -p /home/documentos/proyectos #
ls -l /home/documentos/proyectos #
chown -R tecnico:trabajadores /home/documentos
chmod -R 777 /home/documentos
ls -l /home/documentos #
testparm #
service samba reload #
smbclient -L localhost -U% #
exit #
