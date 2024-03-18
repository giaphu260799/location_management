CREATE TABLE public.locations (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	"label" text NOT NULL,
	"number" public.ltree NULL,
	area float4 NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT locations_pkey PRIMARY KEY (id),
	CONSTRAINT locations_unique UNIQUE (number)
);
CREATE INDEX gist_idx ON public.locations USING gist (number);
CREATE INDEX number_idx ON public.locations USING btree (number);

INSERT INTO locations (name, label, number, area)
VALUES
    ('Car Park','CarPark',  'A.CarPark', 80.620),
    ('Level 1', '01', 'A.01', 100.920),
    ('Lobby Level1', 'Lobby', 'A.01.Lobby', 80.620),
    ('Master Room', '01', 'A.01.01', 50.110),
    ('Meeting Room 1', 'M1', 'A.01.01.M1', 20.110),
    ('Corridor Level 1', 'Corridor', 'A.01.Corridor', 30.200),
    ('Toilet Level 1', '02', 'A.01.02', 30.200),
    ('Level 5', '05', 'B.05', 150.000),
    ('Utility Room', '11', 'B.05.11', 10.200),
    ('Sanitary Room', '12', 'B.05.12', 12.200),
    ('Male Toilet', '13', 'B.05.13', 30.200),
    ('Genset Room', '14', 'B.05.14', 35.200),
    ('Pantry Level 5', '15', 'B.05.15', 50.200),
    ('Corridor Level 5', 'Corridor', 'B.05.Corridor', 30.000);