FROM nginx:stable-alpine
COPY ./dist /usr/share/nginx/html
COPY ./nginx/default.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]
