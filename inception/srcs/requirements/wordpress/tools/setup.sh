#!/bin/bash
set -ex

chown -R www-data:www-data /var/www/inception/

if [ ! -f "/var/www/inception/wp-config.php" ]; then
   mv /tmp/wp-config.php /var/www/inception/
fi

wp --allow-root --path="/var/www/inception/" core download || true

exec php-fpm8.2 -F