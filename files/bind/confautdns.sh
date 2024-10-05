#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i en_etc.bind/* /etc/bind/ #
cp -f en_var.cache.bind/* /var/cache/bind/ #
named-checkzone 192.168.11.in-addr.arpa /var/cache/bind/192.168.11.rev #
named-checkconf -z #
named-checkconf -p #
service bind9 restart #
exit #
