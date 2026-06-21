-- Homeland Jobs — MySQL schema
-- Run this in phpMyAdmin or: mysql -u root homeland_jobs < sql/schema.sql
-- XAMPP default: no password on root

CREATE DATABASE IF NOT EXISTS homeland_jobs
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE homeland_jobs;

-- ─── users ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20)  NOT NULL DEFAULT 'freelancer',  -- freelancer | client | admin
  status     VARCHAR(20)  NOT NULL DEFAULT 'active',      -- active | suspended
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─── jobs ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id          CHAR(36)        NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  title       VARCHAR(200)    NOT NULL,
  description TEXT            NOT NULL,
  budget      DECIMAL(10, 2)  NOT NULL,
  category    VARCHAR(100),
  status      VARCHAR(20)     NOT NULL DEFAULT 'open',   -- open | paused | closed
  client_id   CHAR(36),
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── proposals ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS proposals (
  id               CHAR(36)       NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  job_id           CHAR(36)       NOT NULL,
  freelancer_id    CHAR(36)       NOT NULL,
  cover_letter     TEXT,
  proposed_amount  DECIMAL(10, 2) NOT NULL,
  status           VARCHAR(20)    NOT NULL DEFAULT 'pending',  -- pending | accepted | rejected
  created_at       TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id)        REFERENCES jobs(id)  ON DELETE CASCADE,
  FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── testimonials ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id         CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  role       VARCHAR(100),
  quote      TEXT         NOT NULL,
  avatar_url VARCHAR(300),
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
