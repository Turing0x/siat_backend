#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i en_etc.default/* /etc/default/ #
# cp -i en_etc.dhcp/* /etc/dhcp/ #
service isc-dhcp-server restart #
exit #
