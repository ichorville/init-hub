FROM node:8.9 AS baseWebBuild
WORKDIR /web
RUN npm cache clean -f
RUN npm install -g @angular/cli
RUN npm config set @csi:registry http://172.15.100.12:4873

FROM baseWebBuild AS form-builder-ui
LABEL builder=form-builder-ui
COPY package.json package.json
RUN npm install;
COPY . .

RUN npm run prod-build

FROM nginx:1.14-alpine
ARG COMMIT=dev
#COPY favicon.ico /usr/share/nginx/html
COPY --from=form-builder-ui /web/dist/admin-engine /usr/share/nginx/html/form-builder-ui/
COPY nginx.conf.template /nginx.conf.template
RUN echo ${COMMIT} > /usr/share/nginx/html/form-builder-ui/version.txt

CMD /bin/sh -c "envsubst < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"
