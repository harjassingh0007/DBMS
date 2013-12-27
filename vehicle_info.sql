create table Vehicle_info(
VIN varchar(20)
Year_of_manufacture int(4),
model_name varchar(20),
owner_name varchar(30),
color varchar(10),
capacity int,
is_AC_vehicle char(1),
fuel_type varchar(10)
);

select * from vehicle_info;

alter table Vehicle_info
add Vehicle_type char(1);

update Vehicle_info
set Vehicle_type = 'C'
where owner_name = 'Harjas Singh';

insert into vehicle_info values('IND7929','2006','Hyundai Qualis','Guri','White',10,'N','Dielse','P');

commit;