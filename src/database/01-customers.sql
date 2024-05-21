DROP DATABASE IF EXISTS customersmanagement;
CREATE DATABASE customersmanagement;

\c customersmanagement;

CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "cpf" VARCHAR(11) NOT NULL UNIQUE,
  "phone" VARCHAR(20) NOT NULL,
  "status" VARCHAR(20) NOT NULL
);


INSERT INTO "customers" ("name", "email", "cpf", "phone", "status")
VALUES ('Alan Wake', 'alan@wake.com', '12345678910', '4899999999', 'Ativo');

INSERT INTO "customers" ("name", "email", "cpf", "phone", "status")
VALUES ('Jesse Faden', 'jesse@faden.com', '12345678920', '4899998888', 'Inativo');

INSERT INTO "customers" ("name", "email", "cpf", "phone", "status")
VALUES ('Sole Survivor', 'sole@survivor.com', '12345678930', '4899997777', 'Aguardando Ativação');

INSERT INTO "customers" ("name", "email", "cpf", "phone", "status")
VALUES ('Arthur Morgan', 'arthur@morgan.com', '12345678940', '4899996666', 'Desativado');
