FOR %i IN (D:\Modules\yajsv\test\fixtures\import\*.json) DO mongoimport --db aim_db --collection lookup --type json --jsonArray --file %i  
