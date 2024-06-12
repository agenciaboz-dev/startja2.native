#!/bin/bash

ssh_profile="root@agencyboz"
user="agenc4028"
domain="agenciaboz.com.br"
subdomain="startja.agenciaboz.com.br"

path="/home/${domain}/${subdomain}"

npx expo export --platform web
echo 'Uploading build to server at' $path
scp -r dist/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
