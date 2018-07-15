
INSERT INTO tkdUnK (kdUnK, unitKerja, alamatUnitKerja, teleponUnK, faxUnk, typeSKPD)
VALUES ('324', 'DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK', 'Komplek Perkantoran Kabupaten Bekasi', '12345667', '12344566', 'lorem'),
	   ('323', 'DINAS LOREM IPSUM', 'Komplek Perkantoran Kabupaten Bekasi', '11223344', '11223344', 'lorem');



INSERT INTO tkdJabatan (kdJabatan, jabatan, eselon, pada, unitKerja, tnjJabatan, tnjJabatanLm, kdUnitKerja, ket)
VALUES ('32400000', 'Kepala Dinas', 'II.b', 'lorem', 'DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK', 12345667, 1234566, '324', 'lorem'),
	   ('32410002', 'Persuratan', 'XS', 'lorem', 'DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK', 12345667, 1234566, '324', 'lorem'),
	   ('32440000', 'Kepala Bidang Infrastruktur', 'III.b', 'lorem', 'DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK', 12345667, 1234566, '324', 'lorem'),
	   ('32440100', 'Kepala Seksi Infrastruktur', 'IV.a', 'lorem', 'DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK', 12345667, 1234566, '324', 'lorem'),
	   ('32300000', 'Kepala Dinas', 'II.b', 'lorem', 'DINAS LOREM IPSUM', 12345667, 1234566, '323', 'lorem'),
	   ('32310002', 'Persuratan', 'XS', 'lorem', 'DINAS LOREM IPSUM', 12345667, 1234566, '323', 'lorem'),
	   ('32340000', 'Kepala Bidang Lorem Ipsum', 'III.b', 'lorem', 'DINAS LOREM IPSUM', 12345667, 1234566, '323', 'lorem'),
	   ('32340100', 'Kepala Seksi Lorem Ipsum', 'IV.a', 'lorem', 'DINAS LOREM IPSUM', 12345667, 1234566, '323', 'lorem');

INSERT INTO pegawai (Nip, NipLm, Nama, GlrDpn, GlrBlk, Gol, Pangkat, KdJabatan, KdUnitKerja, Eselon, Jabatan)
VALUES ('1234567890', '1234567890', 'ROHIM SUTISNA', 'Drs.', 'M.KOM.', 'II', 'Lorem', '32400000', '324', 'II.b', 'Kepala Dinas'),
       ('1234567891', '1234567891', 'ANDRI WAHYUDI', '', 'S.KOM.', 'III', 'Lorem', '32410002', '324', 'XS', 'Persuratan'),
       ('1234567892', '1234567892', 'KOENCORO', 'Drs.', 'M.KOM.', 'III', 'Lorem', '32440000', '324', 'III.b', 'Kepala Bidang Infrastruktur'),
       ('1234567893', '1234567893', 'HIDAYATUL MUSTAQIN', '', 'S.KOM.', 'III', 'Lorem', '32440100', '324', 'IV.a', 'Kepala Seksi Infrastruktur'),
       ('2234567890', '2234567890', 'HUDAYA', 'Drs.', 'M.H.', 'II', 'Lorem', '32300000', '323', 'II.b', 'Kepala Dinas'),
       ('2234567891', '2234567891', 'LOREM IPSUM', '', 'S.ST.', 'III', 'Lorem', '32310002', '323', 'XS', 'Persuratan'),
       ('2234567892', '2234567892', 'DOLOR SIT AMET', '', 'S.H.', 'III', 'Lorem', '32340000', '323', 'III.b', 'Kepala Bidang Lorem Ipsum'),
       ('2234567893', '2234567893', 'CONSECTETUR ADIPISCING', '', 'S.E.', 'III', 'Lorem', '32340100', '323', 'IV.a', 'Kepala Seksi Lorem Ipsum');