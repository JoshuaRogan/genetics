FROM hitalos/php:5.0
LABEL maintainer="hitalos <hitalos@gmail.com>"

# Download and install NodeJS
#ADD install-node.sh /usr/sbin/install-node.sh
#RUN /usr/sbin/install-node.sh

WORKDIR /var/www
CMD composer install
#CMD php artisan serve --port=8090 --host=0.0.0.0
EXPOSE 8090
HEALTHCHECK --interval=1m CMD curl -f http://localhost/ || exit 1
