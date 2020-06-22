FROM bcgovimages/aries-cloudagent:py36-1.14-1_0.5.1
RUN echo "Pulling bcgovimages/aries-cloudagent"
USER root
ENV NODE_VERSION=12.16.1
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync -y
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/home/indy/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /home/indy/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /home/indy/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
WORKDIR /usr/src/app
COPY package*.json ./
RUN /home/indy/.nvm/versions/node/v${NODE_VERSION}/bin/npm install
COPY . .
RUN /home/indy/.nvm/versions/node/v${NODE_VERSION}/bin/npm run build
RUN /home/indy/.nvm/versions/node/v${NODE_VERSION}/bin/npm run db:migrate
ENTRYPOINT [ "/usr/bin/env" ]
CMD [ "node","dist/server.js" ]
