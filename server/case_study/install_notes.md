

MySQL

password: password1234


CREATE TABLE words;

CREATE USER 'easy_onset_db'@'localhost' IDENTIFIED BY 'SKLJET>WQN#%KQ#%Q';
GRANT ALL PRIVILEGES ON words.* TO 'easy_onset_db'@'localhost';

mysql -u easy_onset_db -p words < words.sql


