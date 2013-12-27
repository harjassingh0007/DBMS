SHOW VARIABLES
select * from student
update student
set City = 'Faridabad'
where Name = 'Meenakshi'
commit;
rollback;
insert into student
values(21,'Mani','F',"2013-12-19",'Civil',8884907199,'Govt poly','Ambala',134003,NULL,NULL,100,NULL,NULL,NULL);
commit;
update student
set subject_4 = subject_4 + 20, subject_5 = (subject_5 * 3)-90 where Name like 'A%' OR Name like 'a%';

select *  from student

UPDATE student
set subject_4 = 50
where Subject_4 = 20;

 select * from student
update student
set subject_1 = subject_1+5,
subject_2 = subject_2+7,
subject_3 = subject_3-4,
subject_4 = subject_4+21,
subject_5 = (subject_5 +230)/3
WHERE RollNo%3=0 OR RollNo%5=0;

update student
set subject_5 = 100
where subject_5>100;

commit;
select * from student;
select subject_1, count(subject_1) from student group by subject_1;

select subject_1 from student group by subject_1;