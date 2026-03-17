FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

RUN chmod +x /app/test/entrypoint-test.sh

ENTRYPOINT ["/app/test/entrypoint-test.sh"]
CMD ["test"]