CREATE TABLE symbols (
  code VARCHAR(3) PRIMARY KEY
);

INSERT INTO symbols (code) VALUES
  ('EUR'),
  ('HUF');

CREATE TABLE change_rates (
  id SERIAL PRIMARY KEY,
  from_code VARCHAR(3) NOT NULL,
  to_code VARCHAR(3) NOT NULL,
  rate NUMERIC NOT NULL,
  UNIQUE (from_code, to_code),
  CONSTRAINT fk_from_code FOREIGN KEY(from_code) REFERENCES symbols(code),
  CONSTRAINT fk_to_code FOREIGN KEY(to_code) REFERENCES symbols(code)
);

INSERT INTO change_rates (id, from_code, to_code, rate) VALUES
  (DEFAULT, 'EUR', 'HUF', 330);