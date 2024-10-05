!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i hostname /etc/ #
cp -i hosts /etc/ #
cp -i resolv.conf /etc/ #
cp -i interfaces /etc/network/ #
/etc/init.d/networking restart #
ifconfig #
reboot #
exit #
