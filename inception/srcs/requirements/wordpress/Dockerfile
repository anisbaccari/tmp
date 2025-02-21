FROM debian:bookworm

EXPOSE 9000
ARG PHPPATH=/etc/php/8.2/fpm

RUN apt update && apt install --no-install-recommends --no-install-suggests -y \
    ca-certificates \
    php8.2-fpm \
    php8.2-mysql \
    php8.2-curl \
    php8.2-gd \
    php8.2-intl \
    php8.2-mbstring \
    php8.2-soap \
    php8.2-xml \
    php8.2-zip \
    wget \
    tar && \
    rm -rf /var/lib/apt/lists/*

COPY conf/www.conf ${PHPPATH}/pool.d/
        #COPY/MODIFY the file inside the PHP folder 
RUN sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g' ${PHPPATH}/php.ini && \
    sed -i "s/listen = \/run\/php\/php$PHP_VERSION_ENV-fpm.sock/listen = 9000/g" ${PHPPATH}/pool.d/www.conf && \
    sed -i 's/;listen.mode = 0660/listen.mode = 0660/g' ${PHPPATH}/pool.d/www.conf && \                
    sed -i 's/;daemonize = yes/daemonize = no/g' ${PHPPATH}/pool.d/www.conf
        
        #Download the wordpress CLI, change its permissions and move it to the bin/wp folder.
RUN wget --no-check-certificate https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp
        
        #Create some folders needed by the wordpress
        # files and change its owner to www-data user.
RUN mkdir -p /run/php/ && \
    mkdir -p /var/run/php/ && \
    mkdir -p /var/www/inception/
        
RUN chown -R www-data:www-data /var/www/inception/
        
COPY conf/wp-config.php /tmp/
        
COPY tools/setup.sh /bin/
RUN chmod +x /bin/setup.sh
        
CMD ["setup.sh", "php-fpm8.2", "--nodaemonize"]